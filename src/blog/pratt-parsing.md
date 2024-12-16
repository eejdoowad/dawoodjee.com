---
title: Pratt Parsing
description: The definitive guide
created: 2024-12-14
---

Hundreds of Pratt parsing posts exist. I hope this one is relatively clear,
concise, and comprehensive.

Learn how Pratt parsers work by writing one. I assume familiarity with
[grammars, parsers](https://web.archive.org/web/20240413191133/https://web.mit.edu/6.102/www/sp24/classes/12-grammars-parsing/)
and TypeScript.

The
[code](https://github.com/eejdoowad/dawoodjee.com/blob/main/src/static/assets/pratt-parsing/parser.ts)
is public domain. Send feedback by email.

## Motivation

This is an intuitive expression grammar.

```
expr = expr ("+" | "-" | "*" | "/") expr
     | "-" expr
     | number
```

The problem is it's ambiguous. `1 + 2 * 3` can be parsed as `(1 + 2) * 3` or
`1 + (2 * 3)`.

The textbook way to resolve ambiguity is to convolute the grammar with
associativity and precedence rules.

```
expr = expr ("+" | "-") term
     | term

term = term ("*" | "/") factor
     | factor

factor = factor "^" number
     | "-" factor
     | number
```

This grammar is _not_ intuitive. It gets worse if your parser cannot handle left
recursion. And worse as you add more operators.

## Pratt Parsing

Pratt parsing supports intuitive expression grammars. It resolves ambiguity by
enforcing precedence and associativity in the parsing routine.

Specifically, Pratt parsing encodes increasing precedence in nested recursive
function calls.

We'll build a series of gradually better parsers to explain how it works.

### The Scanner

Assume this interface for the scanner.

```ts
interface Context {
    tokens: string[];
    index: number;
}
function has_token(ctx: Context): boolean;
function next_token(ctx: Context): string | undefined;
function peek_token(ctx: Context): string | undefined;
```

### No Precedence, Left-Associative Parser

Start simple. Assume all operators are left-associative and without precedence.

The expression grammar supports this with a repeated tail.

```
expr = number (tail_op number)*
       |    | |               |
       └head┘ └──────tail─────┘
```

The implementation reflects the grammar.

```ts
function expr(ctx) {
    let left_expr = number(next_token(ctx));
    while (has_token(ctx)) {
        const op = tail_op(next_token(ctx));
        const right_expr = number(next_token(ctx));
        left_expr = infix(op, left_expr, right_expr);
    }
    return left_expr;
}
```

`1 + 2 + 3 * 4 * 5` parses as `((((1 + 2) + 3) + 4) + 5)`.

### No Precedence, Right-Associative Parser

Now assume all operators are right-associative and without precedence

The expression grammar supports this with a right-recursive tail.

```
expr = number (tail_op expr)?
```

The implementation reflects the grammar.

```ts
function expr(ctx) {
    let left_expr = number(next_token(ctx));
    if (has_token(ctx)) {
        const op = tail_op(next_token(ctx));
        const right_expr = expr(ctx);
        left_expr = infix(op, left_expr, right_expr);
    }
    return left_expr;
}
```

`1 + 2 + 3 * 4 * 5` parses as `(1 + (2 + (3 * (4 * 5))))`.

### Mixed-Associativity Parser

In reality, operator precedence and associativity varies.

Sometimes the parser should apply an operator immediately as in the first
parser. Other times it should wait until later operators are applied as in the
second parser.

Merge the grammars to enable this choice:

```rs
expr = number (tail_op number)*   // Parser 1
expr = number (tail_op expr  )?   // Parser 2
expr = number (tail_op expr  )*   // Merged
```

Take the second parser and rewrite `if` to `while`.

```ts
function expr(ctx) {
    let left_expr = number(next_token(ctx));
    while (has_token(ctx)) {
        const op = tail_op(next_token(ctx));
        const right_expr = expr(ctx);
        left_expr = infix(op, left_expr, right_expr);
    }
    return left_expr;
}
```

As written, this parser's behavior is indistinguishable from the second parser
because it _always_ chooses to recurse until the input is exhausted.

### Respecting Precedence

The key idea behind Pratt parsing is to use nested levels of recursion to
represent nested expressions of increasing precedence.

By definition, a level exits when an operator with lower precedence appears.

The parent operator determines a level's precedence. The root expression has no
parent, which means minimum precedence.

```ts
// Compares the precedence of two operators
function cmp_precedence(op1, op2): "<" | "=" | ">";

function expr(ctx, parent_op) {
    let left_expr = number(next_token(ctx));
    while (has_token(ctx)) {
        const op = tail_op(peek_token(ctx));
        if (cmp_precedence(op, parent_op) === "<") break;
        next_token(ctx);
        const right_expr = expr(ctx, op);
        left_expr = infix(op, left_expr, right_expr);
    }
    return left_expr;
}

expr(ctx, Op.Root); // Expected syntax for parsing an expression.
```

### Respecting Associativity

The previous parser makes all operators right-associative because it does not
consider how to handle operators of equal precedence.

- For right-associative operators, the parser should recurse to get the
  right-hand-side expression.
- For left-associative operators, the parser should return the current
  expression to be the right-hand-side of the parent expression.

```ts
function expr(ctx, parent_op) {
    let left_expr = number(next_token(ctx));
    while (has_token(ctx)) {
        const op = tail_op(peek_token(ctx));
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        next_token(ctx);
        const right_expr = expr(ctx, op);
        left_expr = infix(op, left_expr, right_expr);
    }
    return left_expr;
}
```

### Head and Tail

To simplify future extensions, split the grammar into head and tail rules.

```
expr = expr_head expr_tail*

expr_head = number

expr_tail = tail_op expr
```

Refactor the parser accordingly.

```ts
function expr(ctx, parent_op) {
    const left_expr = expr_head(ctx);
    return expr_tail(ctx, parent_op, left_expr);
}
function expr_head(ctx) {
    return number(next_token(ctx));
}
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        const op = tail_op(peek_token(ctx));
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        next_token(ctx);
        const right_expr = expr(ctx, op);
        left_expr = infix(op, left_expr, right_expr);
    }
    return left_expr;
}
```

### Prefix Operators

Extend `expr_head` to support prefix operators.

```
expr_head = number
          | prefix_op expr
```

Operators like `-` can have overloaded infix and prefix definitions because
`prefix_op` and `tail_op` don't conflict in the grammar.

```ts
function expr_head(ctx) {
    const token = next_token(ctx);
    if (is_number_token(token)) {
        return number(token);
    } else {
        const op = prefix_op(token);
        const right_expr = expr(ctx, op);
        return prefix(op, right_expr);
    }
}
```

### Postfix Operators

Update `expr_tail` to support postfix operators.

```
expr_tail = postfix_op
          | infix_op expr
```

If an operator is both postfix and infix, the parser must look ahead to
differentiate the two cases. Disallow this to simplify parsing.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        const op = tail_op(peek_token(ctx));
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        next_token(ctx);
        if (is_postfix_op(op)) {
            left_expr = postfix(op, left_expr);
        } else {
            const right_expr = expr(ctx, op);
            left_expr = infix(op, left_expr, right_expr);
        }
    }
    return left_expr;
}
```

### Parentheses

Extend `expr_head` to support parenthesized expressions.

```
expr_head = "(" expr ")"
          | number
          | prefix_op expr
```

Parentheses prevent other operators from interacting with the enclosed
expression, so precedence is reset.

```ts
function expr_head(ctx) {
    const token = next_token(ctx);
    if (token === "(") {
        const right_expr = expr(ctx, Op.Root);
        next_token(ctx); // consume ")"
        return right_expr;
    } else if (is_number_token(token)) {
        return number(token);
    } else {
        const op = prefix_op(token);
        const right_expr = expr(ctx, op);
        return prefix(op, right_expr);
    }
}
```

`)` tokens appear where the parser otherwise expects tail operators. They mark
the end of an expression.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        const token = peek_token(ctx);
        if (token === ")") break;
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        next_token(ctx);
        if (is_postfix_op(op)) {
            left_expr = postfix(op, left_expr);
        } else {
            const right_expr = expr(ctx, op);
            left_expr = infix(op, left_expr, right_expr);
        }
    }
    return left_expr;
}
```

### Subscript Operator

The (array) subscript operator resembles a postfix operator because there is no
right argument.

Brackets prevent other operators from interacting with the enclosed expression.

```
expr_tail = infix_op expr
          | postfix_op
          | subscript_op

subscript_op = "[" expr "]"
```

Like `)` tokens, `]` tokens mark the end of an expression.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        const token = peek_token(ctx);
        if (token === ")" || token === "]") break;
        const op = tail_op(token);
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        next_token(ctx);
        if (op === Op.Subscript) {
            const middle_expr = expr(ctx, Op.Root);
            next_token(ctx); // consume "]"
            left_expr = subscript(left_expr, middle_expr);
        } else if (is_postfix_op(op)) {
            left_expr = postfix(op, left_expr);
        } else {
            const right_expr = expr(ctx, op);
            left_expr = infix(op, left_expr, right_expr);
        }
    }
    return left_expr;
}
```

### Ternary Operator

The ternary operator `left ? middle : right` resembles an infix operator because
it has an unenclosed right argument.

The middle expression is enclosed so other operators cannot affect how it is
parsed.

```
expr_tail = infix_op expr
          | postfix_op
          | subscript_op
          | ternary_op

ternary_op = "?" expr ":" expr
```

`:` tokens mark the end of an expression.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        const token = peek_token(ctx);
        if (token === ")" || token === "]" || token === ":") break;
        const op = tail_op(token);
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        next_token(ctx);
        if (op === Op.Ternary) {
            const middle_expr = expr(ctx, Op.Root);
            next_token(ctx); // consume ":"
            const right_expr = expr(ctx, op);
            left_expr = ternary(left_expr, middle_expr, right_expr);
        } else if (op === Op.Subscript) {
            const middle_expr = expr(ctx, Op.Root);
            next_token(ctx); // consume "]"
            left_expr = subscript(left_expr, middle_expr);
        } else if (is_postfix_op(op)) {
            left_expr = postfix(op, left_expr);
        } else {
            const right_expr = expr(ctx, op);
            left_expr = infix(op, left_expr, right_expr);
        }
    }
    return left_expr;
}
```

### Ternary with Optional Else

Modify the ternary operator so that the `: right` is optional.

Pair every `:` to the closest unpaired `?` so that `a ? b ? c : d` is parsed as
`a ? (b ? c : d)`.

```
ternary_op = "?" expr (":" expr)?
```

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        // ...
        if (op === Op.Ternary) {
            const middle_expr = expr(ctx, Op.Root);
            let right_expr = null;
            if (peek_token(ctx) === ":") {
                next_token(ctx); // consume ":"
                right_expr = expr(ctx, op);
            }
            left_expr = ternary(left_expr, middle_expr, right_expr);
        }
        // ...
    }
    return left_expr;
}
```

### Non-Associative Operators

Is `<<` left-associative or right-associative?

Since it's not obvious, forgo associativity and instead require disambiguating
parentheses.

`a << b` passes because it has one interpretation but `a << b << c` fails as
ambiguous and requires parentheses to fix.

```ts
function error_assoc(op) {
    return new Error(
        `Operator "${op}" is not associative and requires parentheses`,
    );
}

function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        // ...
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=") {
            if (assoc(op) === "left") break;
            if (assoc(op) === "none") throw error_assoc(op);
        }
        // ...
    }
    return left_expr;
}
```

### Operators with Unrelated Precedence

Is `<<` or `**` higher precedence?

Since global precedence is confusing, let's instead define relative precedence
between operator pairs and require parentheses for unrelated operators.

| Expression     | Parse Result | Parse Trees                           |
| -------------- | ------------ | ------------------------------------- |
| `a << b`       | Ok           | `(a << b)`                            |
| `a + b / c`    | Ok           | `(a + (b / c))`                       |
| `a + b << c`   | Error        | `(a + (b << c))` and `((a + b) << c)` |
| `a + (b << c)` | Ok           | `(a + (b << c))`                      |

The parser's `cmp_precedence()` now returns `"!"` for unrelated operators.

```ts
function error_unrelated_ops(op1, op2) {
    return new Error(`"${op1}" is unrelated to "${op2}"`);
}

function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        // ...
        const order = cmp_precedence(op, parent_op);
        if (order === "!") throw error_unrelated_ops(op, parent_op);
        if (order === "<") break;
        if (order === "=") {
            if (assoc(op) === "left") break;
            if (assoc(op) === "none") throw error_assoc(op);
        }
        // ...
    }
    return left_expr;
}
```

### Precedence Groups

Defining the relative precedence between every pair of operators is unscalable
in languages with many operators.

One solution is to organize operators into groups that share the same
associativity and relative precedence.

Let's define a variety of operators, group them, and define each group's
relative precedence.

| Precedence Group | Operators       | Associativity | Greater Precedence Than      |
| ---------------- | --------------- | ------------- | ---------------------------- |
| Postfix          | ++ -- []        | none          | Prefix                       |
| Prefix           | ++ -- + - !     | none          | BitwiseShift, Exponentiation |
| BitwiseShift     | << >>           | none          | Comparison                   |
| Exponentiation   | **              | right         | Multiplication               |
| Multiplication   | * / & %         | left          | Addition                     |
| Addition         | + - \|          | left          | Comparison                   |
| Comparison       | == != < <= > >= | none          | Conjunction                  |
| Conjunction      | &&              | left          | Disjunction                  |
| Disjunction      | \|\|            | left          | Ternary                      |
| Ternary          | ?:              | none          |                              |

Precedence groups form a digraph. Note how BitwiseShift lacks an ordering
relative to Exponentiation, Multiplication, and Addition.

Given precedence `P`, `P(Multiplication) > P(Comparison)` because precedence is
transitive: `P(A) > P(B)` and `P(B) > P(C)` imply `P(A) > P(C)`.

Encode the table data in TypeScript.

```ts
const enum Op {
    PostfixPlusPlus,
    PostfixMinusMinus,
    Subscript,
    // ... remaining operators
}
const enum Group {
    Root,
    Postfix,
    Prefix,
    // ... remaining groups
}
const groups = [
    {
        id: Group.Root,
        ops: [Op.Root],
        assoc: "none",
        gt: [Group.Postfix],
    },
    {
        id: Group.Postfix,
        ops: [Op.PostfixPlusPlus, Op.PostfixMinusMinus /* , ... */],
        assoc: "none",
        gt: [Group.Prefix],
    },
    {
        id: Group.Prefix,
        ops: [Op.PrefixPlusPlus, Op.PrefixMinusMinus /* , ... */],
        assoc: "none",
        gt: [Group.BitwiseShift, Group.Exponentiation],
    },
    // ... remaining groups
];
```

### Implementing assoc() and cmp_precedence()

Precompute mappings from operators to groups and associativities.

```ts
const map_op_to_group = new Map<Op, Group>();
const map_op_to_assoc = new Map<Op, "left" | "right" | "none">();

for (const group of groups) {
    for (const op of group.ops) {
        map_op_to_group.set(op, group.id);
        map_op_to_assoc.set(op, group.assoc);
    }
}
```

`assoc()` is a map lookup.

```ts
function assoc(op) {
    return map_op_to_assoc.get(op)!;
}
```

For each precedence group, precompute lower precedence groups using depth-first
search.

```ts
const precedence_gt = new Map<Group, Set<Group>>();

for (const src of groups) precedence_gt.set(src.id, new Set(src.gt));
for (const [_, dsts] of precedence_gt) {
    const explore = [...dsts];
    while (explore.length) {
        const dst = explore.pop()!;
        dsts.add(dst);
        const next_dsts = precedence_gt.get(dst)!;
        for (const new_dst of next_dsts) {
            if (!dsts.has(new_dst)) {
                explore.push(new_dst);
            }
        }
    }
}
```

`cmp_precedence()` follows.

```ts
function cmp_precedence(op1, op2) {
    const group1 = map_op_to_group.get(op1)!;
    const group2 = map_op_to_group.get(op2)!;
    if (group1 === group2) return "=";
    if (precedence_gt.get(group1)!.has(group2)) return ">";
    if (precedence_gt.get(group2)!.has(group1)) return "<";
    return "!";
}
```

### Error Handling

Handle errors by checking for unexpected tokens.

Start with the head parser.

```ts
function error_bad_token(token) {
    return new Error(`Bad token "${token}"`);
}

function expr_head(ctx) {
    const token = next_token(ctx);
    if (token === "(") {
        const right_expr = expr(ctx, Op.Root);
        const rparen = next_token(ctx);
        if (rparen !== ")") throw error_bad_token(rparen, ")");
        return right_expr;
    } else if (is_number_token(token)) {
        return number(token);
    } else if (is_prefix_op_token(token)) {
        const op = prefix_op(token);
        const right_expr = expr_child(ctx, op);
        return prefix(op, right_expr);
    } else {
        throw error_bad_token(token ?? "EOF");
    }
}
```

And now the tail parser.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        const token = peek_token(ctx);
        if (token === ")" || token === "]" || token === ":") break;
        const op = tail_op(token);
        if (op === undefined) throw error_bad_token(token);
        const order = cmp_precedence(op, parent_op);
        if (order === "!") throw error_unrelated_ops(op, parent_op);
        if (order === "<") break;
        if (order === "=") {
            if (assoc(op) === "left") break;
            if (assoc(op) === "none") throw error_assoc(op);
        }
        next_token(ctx);
        if (op === Op.Ternary) {
            const middle_expr = expr(ctx, Op.Root);
            let right_expr = undefined;
            if (peek_token(ctx) === ":") {
                next_token(ctx);
                right_expr = expr_child(ctx, op);
            }
            left_expr = ternary(left_expr, middle_expr, right_expr);
        } else if (op === Op.Subscript) {
            const middle_expr = expr(ctx, Op.Root);
            const rbracket = next_token(ctx);
            if (rbracket !== "]") throw error_bad_token(rbracket);
            left_expr = subscript(left_expr, middle_expr);
        } else if (is_postfix_op(op)) {
            left_expr = postfix(op, left_expr);
        } else if (is_infix_op(op)) {
            const right_expr = expr_child(ctx, op);
            left_expr = infix(op, left_expr, right_expr);
        }
    }
    return left_expr;
}
```

The parser should parse exactly one expression.

```ts
function parse(ctx) {
    const e = expr(ctx, Op.Root);
    if (has_token(ctx)) throw error_bad_token(peek_token(ctx));
    return e;
}
```

### Final Parser Code

Code for the final parser is
[here](https://github.com/eejdoowad/dawoodjee.com/blob/main/src/static/assets/pratt-parsing/parser.ts)
It includes a scanner and makes greater use of types and enums.

Run tests with `deno test parser.ts`.

### Optional Reading: Binding Power

Other posts explain Pratt parsing using "binding power."

Each operator is assigned a left and right binding power based on its precedence
and associativity:

```ts
bp_l["**"] = 5; // Exponentiation is right-associative so it has higher left
bp_r["**"] = 6; // binding power.

bp_l["*"] = 3; // Multiplication is left associative so it has higher right
bp_r["*"] = 4; // binding power.

bp_l["+"] = 1; // Addition has lower precedence than multiplication so it has
bp_r["+"] = 2; // lower binding powers

bp_l["-"] = 1; // Subtraction has the same precedence and associativity as addition
bp_r["-"] = 2; // so it has the same binding powers.
```

The condition for exiting a level is simplified to a binding power comparison.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        // ...
        if (bp_r[op] < bp_l[parent_op]) break;
        // ...
    }
    return left_expr;
}
```

Personally, I find binding power less intuitive than the equivalent precedence
and associativity checks.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        // ...
        const order = cmp_precedence(op, parent_op);
        if (order === "<") break;
        if (order === "=" && assoc(op) === "left") break;
        // ...
    }
    return left_expr;
}
```

I also think requiring parentheses on expressions that are ambiguous _to humans_
is good language design.

```ts
function expr_tail(ctx, parent_op, left_expr) {
    while (has_token(ctx)) {
        // ...
        const order = cmp_precedence(op, parent_op);
        if (order === "!") throw error_unrelated_ops(op, parent_op);
        if (order === "<") break;
        if (order === "=") {
            if (assoc(op) === "left") break;
            if (assoc(op) === "none") throw error_assoc(op);
        }
        // ...
    }
    return left_expr;
}
```

Unfortunately, binding power requires every operator to have global precedence
and infix operators to be (left or right) associative.

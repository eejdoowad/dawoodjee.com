// Released to the public domain on 2024-12-14 by Sufyan Dawoodjee.
// Use this code for free for any purpose. No attribution required.

// Code for https://dawoodjee.com/blog/pratt-parsing/
//
// Run tests with `deno test parser.ts`

//
// The Scanner
//

type Token = string | undefined; // undefined means EOF

interface Context {
    tokens: string[];
    index: number;
}

function has_token(ctx: Context): boolean {
    return ctx.index < ctx.tokens.length;
}

function next_token(ctx: Context): Token {
    return ctx.tokens[ctx.index++];
}

function peek_token(ctx: Context): Token {
    return ctx.tokens[ctx.index];
}

function scan(program: string): Context {
    const tokens: string[] = [];

    for (let i = 0; i < program.length;) {
        const slice = program.slice(i);

        // Skip whitespace.
        const whitespace = slice.match(/^\s+/);
        if (whitespace) {
            i += whitespace[0].length;
            continue;
        }

        // 2-character tokens.
        if (i + 1 < program.length) {
            const chars = program.slice(i, i + 2);
            switch (chars) {
                case "++":
                case "--":
                case "**":
                case "&&":
                case "||":
                case "==":
                case "!=":
                case "<=":
                case ">=":
                case "<<":
                case ">>":
                    tokens.push(chars);
                    i += 2;
                    continue;
            }
        }

        // 1-character tokens.
        const char = slice[0];
        switch (char) {
            case "+":
            case "-":
            case "*":
            case "&":
            case "|":
            case "!":
            case "<":
            case ">":
            case "?":
            case ":":
            case "(":
            case ")":
            case "[":
            case "]":
            case "/":
            case "%":
                tokens.push(char);
                i++;
                continue;
        }

        // Numbers.
        const match = program.slice(i).match(/^\d+/);
        if (match) {
            tokens.push(match[0]);
            i += match[0].length;
            continue;
        }

        throw new Error(`Unexpected character "${char}"`);
    }

    return { tokens, index: 0 };
}

//
// Operators and Precedence Groups
//

const enum Op {
    PostfixPlusPlus,
    PostfixMinusMinus,
    Subscript,
    PrefixPlusPlus,
    PrefixMinusMinus,
    PrefixPlus,
    PrefixMinus,
    Not,
    BitwiseShiftLeft,
    BitwiseShiftRight,
    Exponentiation,
    Multiplication,
    Division,
    BitwiseAnd,
    Modulus,
    Addition,
    Subtraction,
    BitwiseOr,
    Equal,
    NotEqual,
    LessThan,
    LessThanOrEqual,
    GreaterThan,
    GreaterThanOrEqual,
    And,
    Or,
    Ternary,
    Root,
}

const op_to_string: Record<Op, string> = {
    [Op.PostfixPlusPlus]: "++",
    [Op.PostfixMinusMinus]: "--",
    [Op.Subscript]: "[]",
    [Op.PrefixPlusPlus]: "++",
    [Op.PrefixMinusMinus]: "--",
    [Op.PrefixPlus]: "+",
    [Op.PrefixMinus]: "-",
    [Op.Not]: "!",
    [Op.BitwiseShiftLeft]: "<<",
    [Op.BitwiseShiftRight]: ">>",
    [Op.Exponentiation]: "**",
    [Op.Multiplication]: "*",
    [Op.Division]: "/",
    [Op.BitwiseAnd]: "&",
    [Op.Modulus]: "%",
    [Op.Addition]: "+",
    [Op.Subtraction]: "-",
    [Op.BitwiseOr]: "|",
    [Op.Equal]: "==",
    [Op.NotEqual]: "!=",
    [Op.LessThan]: "<",
    [Op.LessThanOrEqual]: "<=",
    [Op.GreaterThan]: ">",
    [Op.GreaterThanOrEqual]: ">=",
    [Op.And]: "&&",
    [Op.Or]: "||",
    [Op.Ternary]: "?:",
    [Op.Root]: "root",
};

const enum Group {
    Postfix,
    Prefix,
    Exponentiation,
    Multiplication,
    Addition,
    BitwiseShift,
    Comparison,
    Conjunction,
    Disjunction,
    Ternary,
    Root,
}

const enum Assoc {
    Left,
    Right,
    None,
}

interface GroupData {
    id: Group;
    ops: Op[];
    assoc: Assoc;
    gt: Group[];
}

const groups: GroupData[] = [
    {
        id: Group.Postfix,
        ops: [
            Op.PostfixPlusPlus,
            Op.PostfixMinusMinus,
            Op.Subscript,
        ],
        assoc: Assoc.None,
        gt: [Group.Prefix],
    },
    {
        id: Group.Prefix,
        ops: [
            Op.PrefixPlusPlus,
            Op.PrefixMinusMinus,
            Op.PrefixPlus,
            Op.PrefixMinus,
            Op.Not,
        ],
        assoc: Assoc.None,
        gt: [
            Group.BitwiseShift,
            Group.Exponentiation,
        ],
    },
    {
        id: Group.BitwiseShift,
        ops: [Op.BitwiseShiftLeft, Op.BitwiseShiftRight],
        assoc: Assoc.None,
        gt: [Group.Comparison],
    },
    {
        id: Group.Exponentiation,
        ops: [Op.Exponentiation],
        assoc: Assoc.Right,
        gt: [Group.Multiplication],
    },
    {
        id: Group.Multiplication,
        ops: [Op.Multiplication, Op.Division, Op.BitwiseAnd, Op.Modulus],
        assoc: Assoc.Left,
        gt: [Group.Addition],
    },
    {
        id: Group.Addition,
        ops: [Op.Addition, Op.Subtraction, Op.BitwiseOr],
        assoc: Assoc.Left,
        gt: [Group.Comparison],
    },
    {
        id: Group.Comparison,
        ops: [
            Op.Equal,
            Op.NotEqual,
            Op.LessThan,
            Op.LessThanOrEqual,
            Op.GreaterThan,
            Op.GreaterThanOrEqual,
        ],
        assoc: Assoc.None,
        gt: [Group.Conjunction],
    },
    {
        id: Group.Conjunction,
        ops: [Op.And],
        assoc: Assoc.Left,
        gt: [Group.Disjunction],
    },
    {
        id: Group.Disjunction,
        ops: [Op.Or],
        assoc: Assoc.Left,
        gt: [Group.Ternary],
    },
    {
        id: Group.Ternary,
        ops: [Op.Ternary],
        assoc: Assoc.Right,
        gt: [Group.Root],
    },
    {
        id: Group.Root,
        ops: [Op.Root],
        assoc: Assoc.None,
        gt: [],
    },
];

//
// assoc() and cmp_precedence()
//

const map_op_to_group = new Map<Op, Group>();
const map_op_to_assoc = new Map<Op, Assoc>();

for (const group of groups) {
    for (const op of group.ops) {
        map_op_to_group.set(op, group.id);
        map_op_to_assoc.set(op, group.assoc);
    }
}

function assoc(op: Op): Assoc {
    return map_op_to_assoc.get(op)!;
}

const precedence_gt = new Map<Group, Set<Group>>();

for (const src of groups) {
    precedence_gt.set(src.id, new Set(src.gt));
}
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

const enum Order {
    lt,
    eq,
    gt,
    none,
}

function cmp_precedence(op1: Op, op2: Op): Order {
    const group1 = map_op_to_group.get(op1)!;
    const group2 = map_op_to_group.get(op2)!;
    if (group1 === group2) return Order.eq;
    if (precedence_gt.get(group1)!.has(group2)) return Order.gt;
    if (precedence_gt.get(group2)!.has(group1)) return Order.lt;
    return Order.none;
}

//
// Expression Types
//

const enum ExprKind {
    Number,
    Prefix,
    Infix,
    Postfix,
    Ternary,
    Subscript,
}

type Expr =
    | NumberExpr
    | PrefixExpr
    | InfixExpr
    | PostfixExpr
    | SubscriptExpr
    | TernaryExpr;

type NumberExpr = {
    kind: ExprKind.Number;
    value: string;
};
type PrefixExpr = {
    kind: ExprKind.Prefix;
    op: Op;
    right: Expr;
};
type InfixExpr = {
    kind: ExprKind.Infix;
    op: Op;
    left: Expr;
    right: Expr;
};
type PostfixExpr = {
    kind: ExprKind.Postfix;
    op: Op;
    left: Expr;
};
type SubscriptExpr = {
    kind: ExprKind.Subscript;
    left: Expr;
    right: Expr;
};
type TernaryExpr = {
    kind: ExprKind.Ternary;
    left: Expr;
    middle: Expr;
    right: Expr | undefined;
};

//
// Expr Utilities
//
function is_number_token(token: Token): token is Exclude<Token, undefined> {
    if (token === undefined) return false;
    return /^[0-9]+$/.test(token);
}

type PrefixToken = "++" | "--" | "+" | "-" | "!";

function is_prefix_op_token(token: Token): token is PrefixToken {
    switch (token) {
        case "++":
        case "--":
        case "+":
        case "-":
        case "!":
            return true;
        default:
            return false;
    }
}

type InfixOp =
    | Op.BitwiseShiftLeft
    | Op.BitwiseShiftRight
    | Op.Exponentiation
    | Op.Multiplication
    | Op.Division
    | Op.BitwiseAnd
    | Op.Modulus
    | Op.Addition
    | Op.Subtraction
    | Op.BitwiseOr
    | Op.Equal
    | Op.NotEqual
    | Op.LessThan
    | Op.LessThanOrEqual
    | Op.GreaterThan
    | Op.GreaterThanOrEqual
    | Op.And
    | Op.Or
    | Op.Ternary;

function is_infix_op(op: Op): op is InfixOp {
    switch (op) {
        case Op.BitwiseShiftLeft:
        case Op.BitwiseShiftRight:
        case Op.Exponentiation:
        case Op.Multiplication:
        case Op.Division:
        case Op.BitwiseAnd:
        case Op.Modulus:
        case Op.Addition:
        case Op.Subtraction:
        case Op.BitwiseOr:
        case Op.Equal:
        case Op.NotEqual:
        case Op.LessThan:
        case Op.LessThanOrEqual:
        case Op.GreaterThan:
        case Op.GreaterThanOrEqual:
        case Op.And:
        case Op.Or:
        case Op.Ternary:
            return true;
        default:
            return false;
    }
}

type PostfixOp = Op.PostfixPlusPlus | Op.PostfixMinusMinus | Op.Subscript;

function is_postfix_op(op: Op): op is PostfixOp {
    switch (op) {
        case Op.PostfixPlusPlus:
        case Op.PostfixMinusMinus:
        case Op.Subscript:
            return true;
        default:
            return false;
    }
}

function number(token: Exclude<Token, undefined>): NumberExpr {
    return { kind: ExprKind.Number, value: token };
}

function prefix_op(token: PrefixToken): Op {
    switch (token) {
        case "++":
            return Op.PrefixPlusPlus;
        case "--":
            return Op.PrefixMinusMinus;
        case "+":
            return Op.PrefixPlus;
        case "-":
            return Op.PrefixMinus;
        case "!":
            return Op.Not;
    }
}

function prefix(op: Op, right: Expr): PrefixExpr {
    return { kind: ExprKind.Prefix, op, right };
}

function tail_op(token: Token): InfixOp | PostfixOp | undefined {
    switch (token) {
        case "++":
            return Op.PostfixPlusPlus;
        case "--":
            return Op.PostfixMinusMinus;
        case "[":
            return Op.Subscript;
        case "<<":
            return Op.BitwiseShiftLeft;
        case ">>":
            return Op.BitwiseShiftRight;
        case "**":
            return Op.Exponentiation;
        case "*":
            return Op.Multiplication;
        case "/":
            return Op.Division;
        case "&":
            return Op.BitwiseAnd;
        case "%":
            return Op.Modulus;
        case "+":
            return Op.Addition;
        case "-":
            return Op.Subtraction;
        case "|":
            return Op.BitwiseOr;
        case "==":
            return Op.Equal;
        case "!=":
            return Op.NotEqual;
        case "<":
            return Op.LessThan;
        case "<=":
            return Op.LessThanOrEqual;
        case ">":
            return Op.GreaterThan;
        case ">=":
            return Op.GreaterThanOrEqual;
        case "&&":
            return Op.And;
        case "||":
            return Op.Or;
        case "?":
            return Op.Ternary;
        default:
            return undefined;
    }
}

function infix(op: Op, left: Expr, right: Expr): InfixExpr {
    return { kind: ExprKind.Infix, op, left, right };
}

function postfix(op: Op, left: Expr): PostfixExpr {
    return { kind: ExprKind.Postfix, op, left };
}

function subscript(left: Expr, right: Expr): SubscriptExpr {
    return { kind: ExprKind.Subscript, left, right };
}

function ternary(
    left: Expr,
    middle: Expr,
    right: Expr | undefined,
): TernaryExpr {
    return { kind: ExprKind.Ternary, left, middle, right };
}

//
// Parsing Errors
//

function error_bad_token(token: Token, expected?: Token) {
    return new Error(
        `Unexpected "${token ?? "EOF"}"${
            expected ? `, expected "${expected}"` : ""
        }`,
    );
}

function error_assoc(op: Token) {
    return new Error(
        `Operator "${op}" is not associative and requires parentheses`,
    );
}

function error_unrelated_ops(op1: Op, op2: Op) {
    return new Error(
        `"${op_to_string[op1]}" is unrelated to "${op_to_string[op2]}"`,
    );
}

//
// Parser
//

function parse(ctx: Context): Expr {
    const e = expr(ctx, Op.Root);
    if (has_token(ctx)) throw error_bad_token(peek_token(ctx));
    return e;
}

function expr(ctx: Context, parent_op: Op): Expr {
    const left_expr = expr_head(ctx);
    return expr_tail(ctx, parent_op, left_expr);
}

function expr_head(ctx: Context): Expr {
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
        const right_expr = expr(ctx, op);
        return prefix(op, right_expr);
    } else {
        throw error_bad_token(token ?? "EOF");
    }
}

function expr_tail(
    ctx: Context,
    parent_op: Op,
    left_expr: Expr,
): Expr {
    while (has_token(ctx)) {
        const token = peek_token(ctx);
        if (token === ")" || token === "]" || token === ":") break;
        const op = tail_op(token);
        if (op === undefined) throw error_bad_token(token);
        const order = cmp_precedence(op, parent_op);
        if (order === Order.none) throw error_unrelated_ops(op, parent_op);
        if (order === Order.lt) break;
        if (order === Order.eq) {
            if (assoc(op) === Assoc.Left) break;
            if (assoc(op) === Assoc.None) throw error_assoc(token);
        }
        next_token(ctx);
        if (op === Op.Ternary) {
            const middle_expr = expr(ctx, Op.Root);
            let right_expr = undefined;
            if (peek_token(ctx) === ":") {
                next_token(ctx);
                right_expr = expr(ctx, op);
            }
            left_expr = ternary(left_expr, middle_expr, right_expr);
        } else if (op === Op.Subscript) {
            const middle_expr = expr(ctx, Op.Root);
            const rbracket = next_token(ctx);
            if (rbracket !== "]") throw error_bad_token(rbracket, "]");
            left_expr = subscript(left_expr, middle_expr);
        } else if (is_postfix_op(op)) {
            left_expr = postfix(op, left_expr);
        } else if (is_infix_op(op)) {
            const right_expr = expr(ctx, op);
            left_expr = infix(op, left_expr, right_expr);
        }
    }
    return left_expr;
}

//
// Tests
//

function expr_to_string(expr: Expr): string {
    switch (expr.kind) {
        case ExprKind.Number: {
            return expr.value;
        }
        case ExprKind.Prefix: {
            const r = expr_to_string(expr.right);
            const op = op_to_string[expr.op];
            return `(${op}${r})`;
        }
        case ExprKind.Infix: {
            const l = expr_to_string(expr.left);
            const r = expr_to_string(expr.right);
            const op = op_to_string[expr.op];
            return `(${l} ${op} ${r})`;
        }
        case ExprKind.Postfix: {
            const l = expr_to_string(expr.left);
            const op = op_to_string[expr.op];
            return `(${l}${op})`;
        }
        case ExprKind.Subscript: {
            const l = expr_to_string(expr.left);
            const r = expr_to_string(expr.right);
            return `(${l}[${r}])`;
        }
        case ExprKind.Ternary: {
            const l = expr_to_string(expr.left);
            const m = expr_to_string(expr.middle);
            if (expr.right) {
                const r = expr_to_string(expr.right);
                return `(${l} ? ${m} : ${r})`;
            }
            return `(${l} ? ${m})`;
        }
    }
}

function assert_parse(program: string, expected: string) {
    const actual = expr_to_string(parse(scan(program)));
    if (actual !== expected) {
        throw new Error(`Expected ${expected} but got ${actual}`);
    }
}

function assert_parse_error(program: string, expected: string) {
    try {
        parse(scan(program));
    } catch (e) {
        if (e.message.includes(expected)) return;
        throw new Error(
            `Expected error to contain "${expected}" but got "${e.message}"`,
        );
    }
    throw new Error(`Expected error but got none`);
}

Deno.test("Nothing", () => {
    assert_parse_error("", 'Unexpected "EOF"');
});

Deno.test("Number", () => {
    assert_parse("1", "1");
});

Deno.test("Consecutive numbers", () => {
    assert_parse_error("1 2", 'Unexpected "2"');
});

Deno.test("Parentheses", () => {
    assert_parse("(1)", "1");
});

Deno.test("lparen only", () => {
    assert_parse_error("(", 'Unexpected "EOF"');
});

Deno.test("rparen only", () => {
    assert_parse_error(")", 'Unexpected ")"');
});

Deno.test("Unmatched lparen", () => {
    assert_parse_error("(1", 'expected ")"');
});

Deno.test("Unmatched rparen", () => {
    assert_parse_error("1)", 'Unexpected ")"');
});

Deno.test("Prefix operator", () => {
    assert_parse("-1", "(-1)");
});

Deno.test("Infix operator", () => {
    assert_parse("1 + 2", "(1 + 2)");
});

Deno.test("Postfix operator", () => {
    assert_parse("1++", "(1++)");
});

Deno.test("Subscript operator", () => {
    assert_parse("1[2]", "(1[2])");
});

Deno.test("lbracket only", () => {
    assert_parse_error("[", 'Unexpected "["');
});

Deno.test("rbracket only", () => {
    assert_parse_error("]", 'Unexpected "]"');
});

Deno.test("Unmatched lbracket", () => {
    assert_parse_error("1[2", 'Unexpected "EOF"');
});

Deno.test("Unmatched rbracket", () => {
    assert_parse_error("1]", 'Unexpected "]"');
});

Deno.test("Ternary operator", () => {
    assert_parse("1 ? 2 : 3", "(1 ? 2 : 3)");
});

Deno.test("Ternary operator without else", () => {
    assert_parse("1 ? 2", "(1 ? 2)");
});

Deno.test("Ternary operator pairs : to closest unpaired ?", () => {
    assert_parse("1 ? 2 ? 3 : 4 : 5", "(1 ? (2 ? 3 : 4) : 5)");
});

Deno.test("Ternary operator associativity", () => {
    assert_parse("1 ? 2 : 3 ? 4 : 5", "(1 ? 2 : (3 ? 4 : 5))");
});

Deno.test("Ternary operator without else associativity", () => {
    assert_parse("1 ? 2 ? 3", "(1 ? (2 ? 3))");
});

Deno.test("Consecutive prefix operators", () => {
    assert_parse("!!1", "(!(!1))");
});

Deno.test("Consecutive postfix operators", () => {
    assert_parse("1++++", "((1++)++)");
});

Deno.test("Left-associative operator", () => {
    assert_parse("1 + 2 + 3", "((1 + 2) + 3)");
});

Deno.test("Right-associative operator", () => {
    assert_parse("1 ** 2 ** 3", "(1 ** (2 ** 3))");
});

Deno.test("Unambiguous non-associative operator", () => {
    assert_parse("1 << 2", "(1 << 2)");
});

Deno.test("Ambiguous non-associative operator", () => {
    assert_parse_error(
        "1 << 2 << 3",
        "not associative and requires parentheses",
    );
});

Deno.test("Precedent operator on left", () => {
    assert_parse("1 * 2 + 3", "((1 * 2) + 3)");
});

Deno.test("Precedent operator on right", () => {
    assert_parse("1 + 2 * 3", "(1 + (2 * 3))");
});

Deno.test("Transitive precedence", () => {
    assert_parse("1 + 2 ** 3", "(1 + (2 ** 3))");
});

Deno.test("Unrelated operators", () => {
    assert_parse_error("1 ** 2 << 3", '"<<" is unrelated to "**"');
});

Deno.test("Prefix precedence", () => {
    assert_parse("!1 + 2", "((!1) + 2)");
});

Deno.test("Postfix precedence", () => {
    assert_parse("1 + 2++", "(1 + (2++))");
});

Deno.test("Parentheses precedence", () => {
    assert_parse("1 * (2 + 3)", "(1 * (2 + 3))");
});

Deno.test("Subscript resets precedence", () => {
    assert_parse("1[2 + 3]", "(1[(2 + 3)])");
});

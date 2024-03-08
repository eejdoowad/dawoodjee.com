---
title: Inductive Deductive
description: An explanation of the "inductive" and "deductive" with examples
draft: true
created: 2024-02-20
---

Huhductive?

The words "inductive" and "deductive" are useful for precisely communicating
programming language theory, This post summarizes their meanings with TypeScript
examples

## Inductive Types

An **inductive** type uses union types and recursion, at least that's what the
[Lean manual](https://lean-lang.org/functional_programming_in_lean/getting-to-know/datatypes-and-patterns.html)
says.

Union types (otherwise knows as a sum types) supports multiple variants.

```typescript
type Unlucky = 4 | 9 | 13 | 17 | 39 | 43 | 666;

type Season = "Spring" | "Summer" | "Fall" | "Winter";

type Shape =
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "circle"; radius: number };
```

Recursive type definitions reference themselves.

```typescript
type InfinitelyRecursing = [InfinitelyRecursing];

type NonEmptyBinaryTree = {
  value: number;
  left?: NonEmptyBinaryTree;
  right?: NonEmptyBinaryTree;
};
```

Inductive types are recursive union types:

```typescript
type LinkedList =
  | undefined
  | { value: number; next: LinkedList };

type BinaryTree =
  | undefined
  | { value: number; left: BinaryTree; right: BinaryTree };

type BooleanExpression =
  | { kind: "true" }
  | { kind: "false" }
  | { kind: "not"; expr: BooleanExpression }
  | { kind: "and"; left: BooleanExpression; right: BooleanExpression }
  | { kind: "or"; left: BooleanExpression; right: BooleanExpression };
```

Some conjectures:

1. Only recursive types that can terminate are useful in practice. The
   `InfinitelyRecursing` example might be valid to TypeScript's compiler, but an
   instance cannot be created without abusing TypeScript's cop-out mechanism,
   the `any` type: `let a: InfinitelyRecursing = [[[1 as any]]]`. Interestingly,
   TypeScript only allows recursive type references as object properties (and
   indexing into an array is a property access in TypeScript).

```typescript
// This is invalid because recursive self references are only allowed as
// object properties, not template literal type interpolations. Maybe
// one day the TypeScript team will do the work to allow this.
type BoolExpr =
  | "true"
  | "false"
  | `(${BoolExpr})`
  | `not ${BoolExpr}`
  | `${BoolExpr} and ${BoolExpr}`
  | `${BoolExpr} or ${BoolExpr}`;

// Interestingly, TypeScript can evaluate strings representing
// boolean expressions using recursive, conditional, inferred types.
type Not<R> = false extends R ? true : false;
type And<R, S> = false extends R | S ? false : true;
type Or<R, S> = true extends R | S ? true : false;

type BoolExpr<T> = T extends "false" ? false
  : T extends "true" ? true
  : T extends `(${infer R})` ? BoolExpr<R>
  : T extends `not ${infer R}` ? Not<BoolExpr<R>>
  : T extends `${infer R} and ${infer S}` ? And<BoolExpr<R>, BoolExpr<S>>
  : T extends `${infer R} or ${infer S}` ? Or<BoolExpr<R>, BoolExpr<S>>
  : never;

const test1: BoolExpr<`not false`> = true;
const test2: BoolExpr<`false or true`> = true;
const test3: BoolExpr<`true and (false or (not true or false))`> = false;
```

2. All terminating recursive types are inductive types. But what about the
   `NonEmptyBinaryTree` example? It's a union type in disguise that can be
   rewritten as:

```typescript
type NonEmptyBinaryTree =
  | { value: number }
  | { value: number; left: NonEmptyBinaryTree }
  | { value: number; right: NonEmptyBinaryTree }
  | { value: number; left: NonEmptyBinaryTree; right: NonEmptyBinaryTree };
```

## Inductive Proofs

```typescript
type pronouns =
  | "dude"
  | "guy"
  | `${pronouns}-${pronouns}`;
```

## Deductive

Deductive sytems repeatedly apply rules to known facts to derive new facts until
no more new facts can be derived.

The example Datalog program below defines 2 starting Brother relations and rules
for associativity and transitivity.

```
- recursive vs non-recursive rules (and how they represent recursive queries)
- negation
- recusion + negation = sql
- If you're not my friend, you're my enemy.
- Any friend of my friend is my friend. 
- You can be both my friend and my enemy. Who are my frenemies?

rules
- no unbounded variables


evaluation algorithms:
- naive
```

```ts
// Starting Facts
Brother("Tecumseh", "Cheeseekau").
Brother("Tecumseh", "Tenskwatawa").

// Rules
Brother(A, B) :- Brother(B, A).
Brother(A, C) :- Brother(A, B), Brother(B, C).
```

Brother(A, B) = (A & B) | ()

```ts
for (;;) {
  for (const rule of rules) {
  }
}
```

```
fn result(facts: Fact*, rules: Rule*): Fact* = (
  for rule: rules
  for new_fact: derive(facts, rule.parts)
)

fn derive(facts: Fact*, parts: Part*): Fact* = (

)

get Fact { type: rule.lhs.name, args: rule.lhs.args }
```

```ts
// Result Facts
Brother("Tecumseh", "Cheeseekau").
Brother("Tecumseh", "Tenskwatawa").
Brother("Cheeseekau", "Tecumseh").
Brother("Cheeseekau", "Tenskwatawa").
Brother("Tenskwatawa", "Tecumseh").
Brother("Tenskwatawa", "Cheeseekau").
```

Things to avoid:

1. Non-closing rules that never reach a fixpoint because they produce an
   infinite set of facts:

```ts
Pronoun("dude").
Pronoun("guy").
Pronoun("person").

Pronoun(x + "-" + y) :- Pronoun(x), Pronoun(y).
```

```ts
const facts = [];
const rules = [];
const input = "";

interface Fact {
  name: string;
  args: string[];
}

interface Rule {
  lhs: Atom;
  parts: Atom[];
}

interface Atom {
}

for (const line of lines) {
  if (line.contains("=")) {
  }
}

for (;;) {
  for (const rule of rules) {
  }
}
```

## Bonus Words

Reductive

Abductive

relation

Transitive Closure

Fixpoint

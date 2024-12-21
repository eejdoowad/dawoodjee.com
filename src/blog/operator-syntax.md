---
title: Operator Syntax
description: Thoughts on operator syntax in programming languages
created: 2024-12-19
draft: true
---

Disclaimer: Statements in this post are generalizations that aren't always true.

## Intro

Operators are functions with special call syntax. Languages don't need
operators; functions are enough. But operators make code easier to read and
write.

Operators have a cost. Recognizing operator syntax complicates compilers.
Remembering the behavior of symbols that lack semantic names complicates coding.

Language designers should carefully consider which operators to support.

## Operator Syntax

Source code is a sequence of characters. Languages recognize syntax trees from
these characters. Some syntax trees represent expressions. Some expressions
represent the application of operators.

The common operator types are prefix, postfix, and infix.

## Insights

- Operators should not be both postfix and infix.
- Operators can be both prefix and infix or both prefix and postfix.
- The string that represents a postfix operator should not be a prefix of the
  string that represents an infix operator: if `!` is a postfix operator, then
  `!.` should not be an infix operator.

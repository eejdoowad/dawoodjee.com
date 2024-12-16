---
title: Rumors on grammars and parsers
description: Not facts, just rumors
created: 2024-12-14
draft: true
---

This post contains incomplete and directionless _rumors_ on grammars and
parsers.

## Rumors

Grammar Design

- Grammar design is an art.
- It's useful to write the grammar to result in nice syntax trees. (pratt,
  left-recursive, shared prefix alternations). This can complicate or restrict
  your parser (e.g. can't use LL,must support backtracking ).
- Error recovery is hard.
- Grammars should be redundant to aid error recovery.
- Don't sacrificed readability to simplify parsing.
- Old languages designed for single-pass compilation were extremely fast to
  compile.
- Keywords are bad.
- Expressions are better than statements.
- There are many grammars for the same language.

Parsing Algorithms

- Parsing is the easiest part of building a compiler.
- Parsing is the least interesting part of building a compiler.
- LR parsers
- Top-down parsing supports better error messages because the parser knows what
  grammar construct is being parsed.

PEG Parsers

- PEGs (Parsing Expression Grammars) are modern compared CFGs (Context-Free
  Grammars).
- Packrat parsing parses PEGs in linear time

Recursive Descent Parsers

- Recursive descent parsers that support backtracking are basically PEG parsers.

Popular Languages

- Often have informally specified grammars
- Often use recursive descent parsers

LR Parsers

- Generated LR parsers are very large in terms of file size.

Incremental Parsers

- Are needed to support interactive development
- Are pointless if your non-incremental compiler is fast enough

Parsing techniques

- Generated
- Recursive descent
- PEGs
- Parser combinators

## Background

Languages

- LL
- PEG
- LR
  - LALR

- Parsers
  - Top-down parsers
    - LL
    - PEG
      - Packrat
    - Recursive descent
  - Bottom-up parsers
    - LR
      - LALR

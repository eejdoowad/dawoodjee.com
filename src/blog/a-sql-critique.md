---
title: A SQL Critique
description: My thoughts on its design
draft: true
created: 2024-03-14
---

SQL is decent for what it is – a language for managing and accessing flat data
tables. If that's all you have to do, it mostly works, as evidenced by its
dominance as the lingua franca of databases since its inception. If something
were truly significantly better, it would have caught on by now. That's not to
say it's perfect... my experience with its flaws gave rise to this post.

## Flat data tables

Most relational databases operate on 2-dimensional tables in which each row
represents a tuple and each column represents a property. Columns have a scalar
type shared by all values within the column, and every scalar type has a unique
null value that is neither equal to itself nor comparable to the null value of
other scalar types.

In this data model, nullary and unary values are trivially and efficiently
representable. This is sufficient for many useful types of data. For example, a
literary publisher's catalog system might define a book as having one title. By
convention, if a title is not yet decided, its value in the database is NULL.

But trouble brews when the publisher decides to localize the title by region,
therefore requiring a plurality of title values per book. One workaround is to
segment the title property into its own table, augmented with a foreign key to
each title's book. Another workaround is to exploit array-like types supported
by some SQL databases.

In some alternate universe, relational databases support nested relations and
these workarounds are unnecessary. But that's not the world we live in. And
that's not the world SQL lives in. SQL is built for the universe of flat data
tables.

## Limitations

- Groupings cannot yield sets; non-grouping columns may only contain aggregate
  functions that return scalar values.
- In some contexts, subqueries must have exactly 1 column (arity = 1) and at
  most 1 row (cardinality <= 1)

## Language flaws

-
- Grouping and Selection are confusingly intertwined
- Where, Having, Qualify

## SQL Joins and Aggregation

A cross join pairs each member of the left input with each member of the right
input. There are a few ways to think about it:

A = {c, d}, B = {x, y, z}

1. Unsimplified: `{c, d} × {x, y, z}`
2. Each member of one set paired with the other set
   - Each member of the left set paired with the right set:
     `{c} × {x, y, z} + {d} × {x, y, z}`
   - Each member of the right set paired with the left set:
     `{x} × {c, d} + {y} × {c, d} + {z} × {c, d}`
3. Each member of the left set paired with each member of the right set:
   `{(c, x), (c, y), (c, z), (d, x), (d, y), (d, z)}`

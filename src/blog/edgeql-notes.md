---
title: EdgeQL Notes
description: TODO
draft: true
created: 2024-03-14
---

EdgeDB reimagines relational databases without SQL. Instead, a new language -
EdgeQL - is used to model and query data. EdgeQL's design significantly
simplifies writing graph queries (queries returning nested relations).

- The database is modelled as a polymorphic object graph
- Every object has a globally unique ID, which makes the database a set of
  objects
- Object relationships are explicitly defined in link properties, though cross
  joins and correlated subqueries still work
- All values are sets of defined cardinality (zero, one, at most one, at least
  one, many)
- There is no null; just empty sets

Interesting design choices

- Object properties are multisets
- Path expressions like a.b.c are graph traversals that return all reachable
  elements, which is a distinct set by definition; and this definition allows
  for an efficient semi-join implementaiton
- Group by

---
title: Definitions
description: For personal reference
draft: true
created: 2024-03-14
---

- **Propositional logic** - deals with (true or false) propositions and
  relationships among propositions, including logical connectives like AND (∧),
  OR (∨), NOT (¬), XOR, etc
- **First-order logic** - extends propositional logic with facts over quantified
  variables, where quantification may be universal (∀) or existential (∃)
- **Horn Clause** - in propositional logic, a clause of the form
  `A ∧ B .. ∧ D -> R`, and when extended to first-order logic (A, B, .. D, R)
  are relations over universally quantified variables
- **First normal form (1NF)** - in relational data modelling disallows tables of
  tables (or equivalently no nested sets). Instead the parent table should link
  to the unnested child table.
- **Sixth normal form (6NF)** - in relational data modelling stores data in
  tables with at most one non-primary-key column. This usually result in a
  binary (two-column) table where one column identifies an entity and the other
  column stores a property value. It also removes the need for null values.
- **Three valued logic** - deals with operations on (true, false, null) and is
  very much not intuitive

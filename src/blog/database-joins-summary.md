---
title: Database Joins Summary
description: For reference purposes
draft: true
created: 2024-05-01
---

## Overview

SQL joins combine two input relations into an output relation based on a
specified condition.

| join type                                  | symbol | associative | commutative | min ∣O∣   | max ∣O∣   | SQL syntax | equivalent to         | notes                       |
| ------------------------------------------ | ------ | ----------- | ----------- | --------- | --------- | ---------- | --------------------- | --------------------------- |
| cross join                                 | X      | yes         | yes         | ∣L∣ * ∣R∣ | ∣L∣ * ∣R∣ | X          |                       |                             |
| inner join                                 | X      | yes         | yes         | 0         | ∣L∣ * ∣R∣ | X          | filter ∘ cross_join   |                             |
| left join                                  | X      | yes         | no          | ∣L∣       | ∣L∣ * ∣R∣ | X          |                       |                             |
| right join                                 | X      | yes         | no          | ∣R∣       | ∣L∣ * ∣R∣ | X          | left_join(R, L)       |                             |
| -                                          | -      | -           | -           | -         | -         | -          |                       |                             |
| semi join                                  | X      | -           | no          | 0         | ∣L∣       | X          |                       |                             |
| anti join                                  | X      | -           | no          | 0         | ∣L∣       | X          |                       |                             |
| -                                          | -      | -           | -           | -         | -         | -          |                       |                             |
| correlated subquery in select              | X      | -           | -           | ∣L∣       | ∣L∣       | X          | left join             | subquery must return scalar |
| correlated subquery in where               | X      | -           | -           | 0         | ∣L∣       | X          | maybe semi/anti-join? |                             |
| correlated subquery in from (lateral join) | X      | -           | -           | 0         | ∣L∣ * ∣R∣ | X          |                       |                             |
| -                                          | -      | -           | -           | -         | -         | -          |                       |                             |
| union all                                  | X      | -           | yes         | ∣L∣ + ∣R∣ | ∣L∣ + ∣R∣ | X          |                       |                             |
| union distinct                             | X      | -           | yes         |           | ∣L∣ + ∣R∣ | X          | D ∘ union_all         |                             |
| intersect all                              | X      | -           | no          | -         | ∣L∣       | X          |                       |                             |
| intersect distinct                         | X      | -           | yes         | -         | ∣L∣       | X          | D ∘ intersect_all     |                             |
| except all                                 | X      | -           | -           | -         | -         | X          |                       |                             |
| except distinct                            | X      | -           | -           | -         | -         | X          | D ∘ except_all        |                             |

| condition type | symbol | SQL syntax | equivalent to | notes                                             |
| -------------- | ------ | ---------- | ------------- | ------------------------------------------------- |
| natural join   | X      | X          |               |                                                   |
| equi join      | X      | X          |               |                                                   |
| theta join     | X      | X          |               | hard to optimize, implemented as slow cross joins |

- `O = Join(L, R) = L ⋈ R`
- ∣I∣ is the total number of elements in relation I
- Distinct: D(I) removes duplicate elements from relation I to return a distinct
  set
- Function Composition: f ∘ g (I) = f(g(I))
- Commutative: a ⋅ b = b ⋅ a
- Associative: (a ⋅ b) ⋅ c = a ⋅ (b ⋅ c)

## Example Data

```sql
create table user (
    user_id integer primary key,
    username text
)

create table post (
    post_id integer primary key,
    user_id integer,
    content text
);
```

## Cross Join

Cross join outputs the pairwise combination of every element of input set with
input set b.

Examples

```sql
select * from user cross join post;
select * from user, post;
```

Notes

- Cross joins are commutative (`a cross join b = b cross join a`) and
  associative (`(a cross join b) cross join c = a cross join (b cross join c)`)
- The output size is the product of each input's size: `|O| = |A| * |B|`
- Cross joins are expensive
- A cross join is equivalent to

## Inner Join

```sql
select * from user inner join post on user.user_id = post.user_id;
select * from user join post on user.user_id = post.user_id;
```

Notes

- An inner join is equivalent to a cross join followed by a filter

## Left Join

```sql
select * from user inner join post on user.user_id = post.user_id;
select * from user join post on user.user_id = post.user_id;
```

## Right Join

Notes

- Right joins are awkward left join

## Full Outer Join

## Semi-Join

Returns tuples from the left input set for which there exist a matching tuple in
the right input set.

Differences from inner join:

- Does not return the corresponding tuple from the right input set
- Does not return multiple results if there are multiple matches in the right
  input set

```sql
select *
from user
where exists (
  select *
  from post
  where post.user_id = user.user_id
);
```

Notes

- Because semi-join are fast, they are used to accelerate graph queries
- If the left input set is distinct, then the output set is distinct

## Anti-Join

Returns tuples from the left input set for which there is no matching tuple in
the right input set.

```sql
select *
from user
where not exists (
  select *
  from post
  where post.user_id = user.user_id
);
```

## Lateral Join

Lateral joins generalize correlated subqueries to support multiple rows and

## Correlated Subquery

- Select clause: left join lateral
- Where clause: semi/anti join
- From clause: (any) join lateral

## Natural Join

TODO

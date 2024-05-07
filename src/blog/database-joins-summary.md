---
title: Database Joins Summary
description: For reference purposes
draft: true
created: 2024-05-01
---

## Overview

Joins combine two input sets into an output set based on some condition.

`O = Join(L, R) = L ⋈ R`

| type                                       | symbol | SQL syntax | associative | commutative | equivalent to                  | min output size | max output size |
| ------------------------------------------ | ------ | ---------- | ----------- | ----------- | ------------------------------ | --------------- | --------------- |
| cross join                                 | X      | X          | yes         | yes         |                                | ∣L∣ * ∣R∣       | ∣L∣ * ∣R∣       |
| inner join                                 | X      | X          | yes         | yes         | cross join + filter            | 0               | ∣L∣ * ∣R∣       |
| left join                                  | X      | X          | yes         | no          |                                | ∣L∣             | ∣L∣ * ∣R∣       |
| right join                                 | X      | X          | yes         | no          | left join with reversed inputs | ∣R∣             | ∣L∣ * ∣R∣       |
| semi join                                  | X      | X          | -           | no          |                                | 0               | ∣L∣             |
| anti join                                  | X      | X          | -           | no          |                                | 0               | ∣L∣             |
| -                                          | -      | -          | -           | -           |                                | -               | -               |
| correlated subquery in select              | X      | X          | -           | -           | special case of left join      | ∣L∣             | ∣L∣             |
| correlated subquery in where               | X      | X          | -           | -           | maybe semi/anti-join?          | 0               | ∣L∣             |
| correlated subquery in from (lateral join) | X      | X          | -           | -           | special case of lateral join   | 0               | ∣L∣ * ∣R∣       |
| -                                          | -      | -          | -           | -           |                                | -               | -               |
| natural join                               | X      | X          | -           | -           |                                | -               | -               |
| union                                      | X      | X          | -           | -           |                                | -               | -               |
| intersection                               | X      | X          | -           | -           |                                | -               | -               |
| difference                                 | X      | X          | -           | -           |                                | -               | -               |

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

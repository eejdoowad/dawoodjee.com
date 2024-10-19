---
title: Assymetric joins are hard
description: Why I don't like left joins.
draft: true
created: 2024-10-06
---

Right joins are less intuitive left joins, and left joins aren't intuitive.
Unfortunately, we need them as long as SQL reigns supreme.

## A framing example

Upset with the dominance of goodreads, you've decided to write your own version,
complete with a web page that shows a book and its authors. To fetch the data,
you draft this SQL query.

```sql
SELECT
  book.title,
  author.name as author_name
FROM book
JOIN book_author ON book.id = book_author.book_id
JOIN author ON book_author.author_id = author.id
```

You load up the page for "1001 Nights" and squint at nothing. Why is the page
empty? A brief scan through your database shows nobody knows who authored "1001
Nights."

"Aha!" you think. Symmetric joins filter out results if any input is missing, so
it's time for a left join. You rewrite the query.

```sql
SELECT
  book.title,
  author.name as author_name
FROM book
LEFT JOIN book_author ON book.id = book_author.book_id
LEFT JOIN author ON book_author.author_id = author.id
```

It works. "1001 Nights" loads up, and you see its title but no authors.

So you work on the next feature, which is adding the publisher.

```sql
SELECT
  book.title,
  author.name as author_name
FROM book
LEFT JOIN book_author ON book.id = book_author.book_id
LEFT JOIN author ON book_author.author_id = author.id
LEFT JOIN book_publisher ON book.id = book_publisher.book_id
LEFT JOIN publisher ON book_publisher.publisher_id = publisher.id
```

You don't really understand what your wrote, but it seems sort of right. A
little bit of testing, shows a few issues.

- If there's more than one

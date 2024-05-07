---
title: Postgres timestamp vs timestamptz
description: An overview because I can never remember the difference
created: 2024-05-06
---

## Recommendations

- Always use `timestamptz`.
- Always set the timezone to UTC using `timezone = 'UTC'` in `postgresq.conf`.
- Always specify the timezone when updating tables or working with timestamp
  literals.

## Definitions

`timestamptz` represents a specific instance in universal time. It can be used
to represent when an account is created, when a user posts a comment, or when a
meeting will start. `timestamptz` is _not_ the combination of a timestamp and a
time zone. It is impossible to recover the time zone used to create a
`timestamptz` value.

`timestamp` represents a conceptual time that might vary based on the frame of
reference. For example, New Year's Day starts on Janaury 1 at midnight, but
midnight occurs at different times across planet Earth. `timestamp` is _not_ a
timestamp relative to the UTC time zone; although the underlying storage format
and existing misuse may imply as such.

`reality` is chaos. If you work on a system with different interpretations of
`timestamp` and `timestamptz`, embracing the chaos may help preserve sanity.

## Literals

Timestamps can be created using the ISO 8601 text format.

| type          | literal syntax                         |
| ------------- | -------------------------------------- |
| `timestamptz` | `timestamptz '2004-10-19 10:23:54-07'` |
| `timestamp`   | `timestamp '2004-10-19 10:23:54'`      |

The optional time zone suffix at the end of a literal indicates the offset
relative to UTC, e.g. UTC is UTC+00, PST is UTC-07, and IST is UTC+05:30

If a `timestamp` is created from a literal with a time zone suffix, the suffix
will be silently ignored.

```sql
select timestamp '2004-10-19 06:23:54+02';
select timestamp '2004-10-19 06:23:54-07';
-- Both queries return 2004-10-19 06:23:54
```

If a `timestamptz` is created from a literal without a time zone suffix, the
time zone is assumed to be the session time zone.

```sql
set timezone = 'America/Los_Angeles';
select timestamptz '2004-10-19 06:23:54';
-- Returns 2004-10-19 06:23:54-07

set timezone = 'America/New_York';
select timestamptz '2004-10-19 06:23:54';
-- Returns 2004-10-19 06:23:54-04
```

## Storage

Both timestamp and timestamptz are stored as 64-bit integers representing the
offset in microseconds since 2000-01-01 00:00:00 UTC.

```sql
select extract(epoch from timestamp '2004-10-19 10:23:54');
select extract(epoch from timestamptz '2004-10-19 06:23:54-04');
select extract(epoch from timestamptz '2004-10-19 03:23:54-07');
-- All queries return 1098181434

select extract(epoch from timestamp '2004-10-19 10:23:54')
     - extract(epoch from timestamp '2000-01-01 00:00:00');
-- Returns 151496634

-- 151496634 seconds = 151496634000000 microseconds = 0x000089C90F0DE280 microseconds
-- If you go digging, you'll find 8 byte integer 0x000089C90F0DE280 in memory.
```

Even though `timestamp` values are stored as offsets relative to the dawn of the
millennium in UTC time, they should not be interpreted as timestamps in the UTC
time zone. Refer to the [definition of timestamp](#definition).

Note that `timestamptz` does _not_ store the time zone. The time zone used to
create a `timestamptz` value cannot be recovered.

## Serialization

`timestamptz` values are serialized using the session time zone.

```sql
set timezone = 'America/Los_Angeles';
select timestamptz '2004-10-19 06:23:54-03';
-- Returns 2004-10-19 02:23:54-07

set timezone = 'America/New_York';
select timestamptz '2004-10-19 06:23:54-03';
-- Returns 2004-10-19 05:23:54-04
```

Serialization of `timestamp` values is time zone independent. The returned value
mirrors the source literal.

```sql
set timezone = 'America/Los_Angeles';
select timestamp '2004-10-19 06:23:54';
-- Returns 2004-10-19 06:23:54

set timezone = 'America/New_York';
select timestamp '2004-10-19 06:23:54';
-- Returns 2004-10-19 06:23:54
```

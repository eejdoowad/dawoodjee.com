---
title: Postgres timestamp vs timestamptz
description: An overview because I can never remember which to use
created: 2024-05-06
---

## Recommendations

- Always use `timestamptz`
- Always set the timezone to UTC using `timezone = 'UTC'` in postgresq.conf
- Always specify the timezone when updating tables or working with timestamp
  literals

## Definitions

`timestamptz` represents a specific instance in time. It might be used to
represent when an account is created, when a user posts a comment, or when a
meeting will start.

`timestamp` represents a conceptual time that might vary based on the frame of
reference. For example, New Year's Day starts on Janaury 1 at midnight, but
midnight occurs at different times across planet Earth.

`reality` is chaos. You might work on a system with different (possibly
multiple) interpretations of `timestamp` and `timestamptz`. Good luck.

## Literals

| type        | literal syntax                         |
| ----------- | -------------------------------------- |
| timestamptz | `timestamptz '2004-10-19 10:23:54-07'` |
| timestamp   | `timestamp '2004-10-19 10:23:54'`      |

The optional timezone suffix at the end of a literal indicates the offset
relative to UTC, e.g. UTC is UTC+00, PST is UTC-07, and IST is UTC+05:30

If a `timestamp` is created from a literal with a timezone suffix, the suffix
will be silently ignored.

```sql
-- Both select statements return 2004-10-19 06:23:54
select timestamp '2004-10-19 06:23:54+02';
select timestamp '2004-10-19 06:23:54-07';
```

If a `timestamptz` is created from a literal without a timezone suffix, the
timezone is assumed to be the session timezone.

```sql
-- Returns 2004-10-19 06:23:54-07
set timezone = 'America/Los_Angeles';
select timestamptz '2004-10-19 06:23:54';

-- Returns 2004-10-19 06:23:54-04
set timezone = 'America/New_York';
select timestamptz '2004-10-19 06:23:54';
```

## Storage

Both timestamp and timestamptz are stored as 64-bit integers representing the
offset in microseconds from 2000-01-01 00:00:00 UTC

```sql
-- All statements below return 1098181434 regardless of the session timezone
-- Note: Extracting the epoch returns the number of seconds
--       since 1970-01-01 00:00:00 UTC
select extract(epoch from timestamp '2004-10-19 10:23:54');
select extract(epoch from timestamptz '2004-10-19 06:23:54-04');
select extract(epoch from timestamptz '2004-10-19 03:23:54-07');
```

Important: Even though `timestamp` values are stored as offsets from UTC, they
should not be interpreted as timestamps in the UTC timezone. Refer to the
[definition of timestamp](#definition).

## Serialization

`timestamptz` values are serialized using the session timezone.

```sql
-- Returns 2004-10-19 02:23:54-07
set timezone = 'America/Los_Angeles';
select timestamptz '2004-10-19 06:23:54-03';

-- Returns 2004-10-19 05:23:54-04
set timezone = 'America/New_York';
select timestamptz '2004-10-19 06:23:54-03';
```

Serialization of `timestamp` values is timezone independent, but because the
underlying [storage](#storage) happens to be a UTC offset, serialization
_appears_ to use the UTC timezone.

```sql
-- Returns 2004-10-19 06:23:54
set timezone = 'America/Los_Angeles';
select timestamp '2004-10-19 06:23:54';

-- Returns 2004-10-19 06:23:54
set timezone = 'America/New_York';
select timestamp '2004-10-19 06:23:54';
```

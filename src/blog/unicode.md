---
title: Unicode By Table
description: Data tables, more for reference, less for learning
draft: false
created: 2025-01-05
show_toc: true
---

This post contains Unicode information and examples in tabular format.

It is more for reference and less for
[learning](https://tonsky.me/blog/unicode/).

### Code Points

Unicode assigns a linguistic meaning to numbers called code points. Code points
are written in hexadecimal by convention, e.g. `U+E5`.

| Glyph | Code Point |
| ----- | ---------- |
| A     | 41         |
| a     | 61         |
| å     | E5         |
| ا     | 627        |
| ❤️    | 2764       |
| ́      | 301        |

Code points are a subset of the integers in range 0 to 10FFFF, requiring up to
21-bits to represent.

As of 2025, Unicode assigns about 150,000 of 1,114,112 numbers. New code points
are added annually.

### Graphemes

A grapheme, short for "extended grapheme cluster", is a sequence of one or more
code points that display as one character. A rendered grapheme is called a
glyph.

| Grapheme Glyph | Code Points    | Code Point Glyphs |
| -------------- | -------------- | ----------------- |
| e              | 65             | e                 |
| é              | 65 301         | e ◌́               |
| ế              | 65 302 301     | e ◌̂ ◌́             |
| ✋🏾           | 270B 1F3FE     | ✋ 🏾             |
| 행             | 1112 1162 11B7 | ㅎ ㅐ ㅇ          |

The
[rules for determining which code point sequences form a grapheme](https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)
are complex.

### Normalization

A grapheme may have multiple representations.

| Grapheme Glyph | Code Points | Code Point Glyphs |
| -------------- | ----------- | ----------------- |
| é              | 233         | é                 |
| é              | 65 301      | e ◌́               |
| श्र             | 931         | श्र                |
| श्र             | 933 94D 930 | श ◌् र             |
| n̂́              | 110 770 769 | n ◌̂ ◌́             |
| n̂́              | 110 769 770 | n ◌́ ◌̂             |

### Indistinguishable Glyphs

Some graphemes may be semantically different but visually indistinguishable.

### Locale Dependent Glyphs

TODO

### Definitions

Unicode

| Term                      | Definition                                                          |
| ------------------------- | ------------------------------------------------------------------- |
| Unicode                   | _The_ standard for encoding text in all the world's languages       |
| Code point                | A number with a meaning assigned by Unicode                         |
| Extended Grapheme Cluster | A sequence of one or more code points that display as a single unit |
| Grapheme                  | Short for "Extended Grapheme Cluster"                               |
| Unicode Block             | A range of Unicode codepoints                                       |
| Unicode Plane             | A range of Unicode codepoints                                       |

Encodings

| Term            | Definition                                                         |
| --------------- | ------------------------------------------------------------------ |
| Code Unit       | The smallest unit used to encode a code point; _N_ bits in UTF-_N_ |
| ASCII           | A text encoding supporting 128 code points common in America       |
| UTF-8           | A text encoding that uses 1 to 4 bytes per code point              |
| UTF-16          | A text encoding that uses 2 or 4 bytes per code point              |
| UTF-32          | A text encoding that uses 4 bytes per code point                   |
| Escape Sequence | A sequence of characters that represent a special character        |

Rendering

| Term     | Definition                              |
| -------- | --------------------------------------- |
| Glyph    | A rendered grapheme (depends on font)   |
| Typeface | A family of related fonts               |
| Font     | A specific implementation of a typeface |

### Sorting and Searching

### Character Normalization

### Character Composition

### Collation

### Directionality

## Encodings

### ASCII

The complete ASCII encodings in hexadecimal.

|       | 0x    | 1x    | 2x   | 3x | 4x | 5x | 6x | 7x    |
| ----- | ----- | ----- | ---- | -- | -- | -- | -- | ----- |
| **0** | _NUL_ | _DLE_ | _SP_ | 0  | @  | P  | `  | p     |
| **1** | _SOH_ | _DC1_ | !    | 1  | A  | Q  | a  | q     |
| **2** | _STX_ | _DC2_ | "    | 2  | B  | R  | b  | r     |
| **3** | _ETX_ | _DC3_ | #    | 3  | C  | S  | c  | s     |
| **4** | _EOT_ | _DC4_ | $    | 4  | D  | T  | d  | t     |
| **5** | _ENQ_ | _NAK_ | %    | 5  | E  | U  | e  | u     |
| **6** | _ACK_ | _SYN_ | &    | 6  | F  | V  | f  | v     |
| **7** | _BEL_ | _ETB_ | '    | 7  | G  | W  | g  | w     |
| **8** | _BS_  | _CAN_ | (    | 8  | H  | X  | h  | x     |
| **9** | _HT_  | _EM_  | )    | 9  | I  | Y  | i  | y     |
| **A** | _LF_  | _SUB_ | *    | :  | J  | Z  | j  | z     |
| **B** | _VT_  | _ESC_ | +    | ;  | K  | [  | k  | {     |
| **C** | _FF_  | _FS_  | ,    | <  | L  | \  | l  | \|    |
| **D** | _CR_  | _GS_  | -    | =  | M  | ]  | m  | }     |
| **E** | _SO_  | _RS_  | .    | >  | N  | ^  | n  | ~     |
| **F** | _SI_  | _US_  | /    | ?  | O  | _  | o  | _DEL_ |

### UTF-8

UTF-8 constructs code points from 1 to 4 code units of 1 byte each. Encodings
are sparse; not all bit permutations are valid.

| Code Points    | Invalid Code Points | Total Code Points | Byte 1        | Byte 2        | Byte 3        | Byte 4        |
| -------------- | ------------------- | ----------------- | ------------- | ------------- | ------------- | ------------- |
| 0000 - 007F    |                     | 128               | **0** xxxxxxx |               |               |               |
| 0080 - 07FF    |                     | 1,920             | **110** xxxxx | **10** xxxxxx |               |               |
| 0800 - FFFF    | D800 - DFFF         | 63,488            | **1110** xxxx | **10** xxxxxx | **10** xxxxxx |               |
| 10000 - 10FFFF |                     | 1,048,576         | **11110** xxx | **10** xxxxxx | **10** xxxxxx | **10** xxxxxx |

Examples

| Glyph | Code Point | Code Point Bits          | Byte 1        | Byte 2        | Byte 3        | Byte 4        |
| ----- | ---------- | ------------------------ | ------------- | ------------- | ------------- | ------------- |
| z     | 0000 007A  | 1111010                  | **0** 1111010 |               |               |               |
| ¢     | 0000 00A2  | 00010 100010             | **110** 00010 | **10** 100010 |               |               |
| €     | 0000 20AC  | 0010 000010 101100       | **1110** 0010 | **10** 000010 | **10** 101100 |               |
| 𐒩     | 0001 04A9  | 000 010000 010010 101001 | **11110** 000 | **10** 010000 | **10** 010010 | **10** 101001 |

### UTF-16

UTF-16 uses 2 bytes for code points in the Basic Multilingual Plane (BMP) and 4
bytes for supplementary code points. Surrogate pairs (`D800` - `DFFF`) are used
for supplementary code points.

| Code Points    | Invalid Code Points | Total Code Points | Byte 1          | Byte 2        | Byte 3          | Byte 4        |
| -------------- | ------------------- | ----------------- | --------------- | ------------- | --------------- | ------------- |
| 0000 - D7FF    |                     | 55,296            | **xxxx** xxxx   | **xxxx** xxxx |                 |               |
| E000 - FFFF    |                     | 8,192             | **xxxx** xxxx   | **xxxx** xxxx |                 |               |
| 10000 - 10FFFF | D800 - DFFF         | 1,048,576         | **110110** xxxx | **xxxx** xxxx | **110111** xxxx | **xxxx** xxxx |

Examples

| Glyph | Code Point | Code Point Bits               | Byte 1          | Byte 2    | Byte 3          | Byte 4 |
| ----- | ---------- | ----------------------------- | --------------- | --------- | --------------- | ------ |
| z     | 0000 007A  | 0000 0000 0111 1010           | 0000 0111       | 1010      |                 |        |
| ¢     | 0000 00A2  | 0000 0000 1010 0010           | 0000 1010       | 0010      |                 |        |
| €     | 0000 20AC  | 0010 0000 1010 1100           | 0010 0000       | 1010 1100 |                 |        |
| 𐒩     | 0001 04A9  | 0000 0001 0000 0100 1010 1001 | **110110** 0001 | 0000      | **110111** 0100 | 1010   |

---

### UTF-32

UTF-32 uses 4 bytes (32 bits) to represent each code point directly. Each code
point maps uniquely to a single encoding, with all four bytes explicitly
representing the value.

| Code Points   | Invalid Code Points | Total Code Points | Byte 1        | Byte 2        | Byte 3        | Byte 4        |
| ------------- | ------------------- | ----------------- | ------------- | ------------- | ------------- | ------------- |
| 0000 - 10FFFF |                     | 1,112,064         | **xxxx** xxxx | **xxxx** xxxx | **xxxx** xxxx | **xxxx** xxxx |

Examples

| Glyph | Code Point | Code Point Bits                    | Byte 1    | Byte 2    | Byte 3    | Byte 4    |
| ----- | ---------- | ---------------------------------- | --------- | --------- | --------- | --------- |
| z     | 0000 007A  | 0000 0000 0000 0000 0000 0111 1010 | 0000 0000 | 0000 0000 | 0000 0000 | 0111 1010 |
| ¢     | 0000 00A2  | 0000 0000 0000 0000 0000 1010 0010 | 0000 0000 | 0000 0000 | 0000 0000 | 1010 0010 |
| €     | 0000 20AC  | 0000 0000 0000 0010 0000 1010 1100 | 0000 0000 | 0000 0010 | 0000 0000 | 1010 1100 |
| 𐒩     | 0001 04A9  | 0000 0001 0000 0100 1010 1001      | 0000 0001 | 0000 0100 | 1010 1001 |           |

### Punycode

TODO

## Language Examples

### Invalid Code Point: "&#xBAAAD; &#xF000D; &#xBEEEF; �"

TODO

Show how they render in different environments.

### ASCII: "Hello"

ASCII text uses one code unit per character in all encodings.

| Glyph | Code Point | UTF-8 | UTF-16 | UTF-32     |
| ----- | ---------- | ----- | ------ | ---------- |
| H     | `48`       | `48`  | `0048` | `00000048` |
| e     | `65`       | `65`  | `0065` | `00000065` |
| l     | `6C`       | `6C`  | `006C` | `0000006C` |
| l     | `6C`       | `6C`  | `006C` | `0000006C` |
| o     | `6F`       | `6F`  | `006F` | `0000006F` |

### Accented Characters: "é é"

Accented characters may comprise a single code point or a base letter code point
and a diacritic combining mark code point.

| Glyph   | Code Point | UTF-8   | UTF-16 | UTF-32     |
| ------- | ---------- | ------- | ------ | ---------- |
| é       | `00E9`     | `C3 A9` | `00E9` | `000000E9` |
| _Space_ | `0020`     | `20`    | `0020` | `00000020` |
| e       | `0065`     | `65`    | `0065` | `00000065` |
| ́        | `0301`     | `CC 81` | `0301` | `00000301` |

### Similar Glyphs: "A Α А 𝐀 𝔸 𝒜"

Different codepoints may produce indistinguishable glyphs.

| Glyph   | Code Point | UTF-8         | UTF-16      | UTF-32     |
| ------- | ---------- | ------------- | ----------- | ---------- |
| A       | `0041`     | `41`          | `0041`      | `00000041` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| Α       | `0391`     | `CE 91`       | `0391`      | `00000391` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| А       | `0410`     | `D0 90`       | `0410`      | `00000410` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| 𝐀       | `1D400`    | `F0 9D 90 80` | `D835 DC00` | `0001D400` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| 𝔸       | `1D538`    | `F0 9D 94 B8` | `D835 DD38` | `0001D538` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| 𝒜       | `1D49C`    | `F0 9D 92 9C` | `D835 DC9C` | `0001D49C` |

### Hangul: "행 행"

Hangul graphemes may comprise a single code point or a sequence of code points.

| Glyph   | Code Point | UTF-8      | UTF-16 | UTF-32     |
| ------- | ---------- | ---------- | ------ | ---------- |
| 행      | `D589`     | `ED 96 89` | `D589` | `0000D589` |
| _Space_ | `0020`     | `20`       | `0020` | `00000020` |
| ㅎ      | `1112`     | `E1 84 92` | `1112` | `00001112` |
| ㅐ      | `1162`     | `E1 85 A2` | `1162` | `00001162` |
| ㅇ      | `11B7`     | `E1 86 B7` | `11B7` | `000011B7` |

### Arabic: "لا ل ا"

Code point ل followed by code point ا produces grapheme لا. The ordering of code
points in the table below _seems_ backwards because arabic is a right-to-left
language.

| Glyph   | Code Point | UTF-8   | UTF-16 | UTF-32     |
| ------- | ---------- | ------- | ------ | ---------- |
| ل       | `0644`     | `D9 84` | `0644` | `00000644` |
| ا       | `0627`     | `D8 A7` | `0627` | `00000627` |
| _Space_ | `0020`     | `20`    | `0020` | `00000020` |
| ل       | `0644`     | `D9 84` | `0644` | `00000644` |
| _Space_ | `0020`     | `20`    | `0020` | `00000020` |
| ا       | `0627`     | `D8 A7` | `0627` | `00000627` |

### Devanagari: "र र् र्ऋ र्ऋं"

0, 1, 2, and 3 modifiers are stacked onto base character र.

| Glyph   | Code Point | UTF-8      | UTF-16 | UTF-32     |
| ------- | ---------- | ---------- | ------ | ---------- |
| र       | `0930`     | `E0 A4 B0` | `0930` | `00000930` |
| _Space_ | `0020`     | `20`       | `0020` | `00000020` |
| र       | `0930`     | `E0 A4 B0` | `0930` | `00000930` |
| ्        | `094D`     | `E0 A4 8D` | `094D` | `0000094D` |
| _Space_ | `0020`     | `20`       | `0020` | `00000020` |
| र       | `0930`     | `E0 A4 B0` | `0930` | `00000930` |
| ्        | `094D`     | `E0 A4 8D` | `094D` | `0000094D` |
| ऋ       | `090B`     | `E0 A4 8B` | `090B` | `0000090B` |
| _Space_ | `0020`     | `20`       | `0020` | `00000020` |
| र       | `0930`     | `E0 A4 B0` | `0930` | `00000930` |
| ्        | `094D`     | `E0 A4 8D` | `094D` | `0000094D` |
| ऋ       | `090B`     | `E0 A4 8B` | `090B` | `0000090B` |
| ं        | `0902`     | `E0 A4 82` | `0902` | `00000902` |

### Half Width and Full Width Characters

TODO

### Locale dependent characters

TODO

## Emoji Examples

### Emoji: "❤️"

Some emojis comprise one code point.

| Glyph | Code Point | UTF-8      | UTF-16 | UTF-32     |
| ----- | ---------- | ---------- | ------ | ---------- |
| ❤️    | `2764`     | `E2 9D A4` | `2764` | `00002764` |

### Skin Tone Emoji: "✋🏾"

Skin tone emojis comprise a base emoji code point and a skin tone modifier code
point.

| Glyph | Code Point | UTF-8         | UTF-16      | UTF-32     |
| ----- | ---------- | ------------- | ----------- | ---------- |
| ✋    | `270B`     | `E2 9C 8B`    | `270B`      | `0000270B` |
| 🏾    | `1F3FE`    | `F0 9F 8F BE` | `D83C DFFE` | `0001F3FE` |

The UTF-16 encoding of 🏾 notably requires surrogate pair `DFFE`.

### ZWJ Emojis: "👨‍👩‍👦‍👦"

Some emojis comprise a sequence of code points interleaved with Zero Width
Joiner (ZWJ) code points.

| Glyph | Code Point | UTF-8         | UTF-16      | UTF-32     |
| ----- | ---------- | ------------- | ----------- | ---------- |
| 👨    | `1F468`    | `F0 9F 91 A8` | `D83D DC68` | `0001F468` |
| _ZWJ_ | `200D`     | `E2 80 8D`    | `200D`      | `0000200D` |
| 👩    | `1F469`    | `F0 9F 91 A9` | `D83D DC69` | `0001F469` |
| _ZWJ_ | `200D`     | `E2 80 8D`    | `200D`      | `0000200D` |
| 👦    | `1F466`    | `F0 9F 91 A6` | `D83D DC66` | `0001F466` |
| _ZWJ_ | `200D`     | `E2 80 8D`    | `200D`      | `0000200D` |
| 👦    | `1F466`    | `F0 9F 91 A6` | `D83D DC66` | `0001F466` |

### Flag Emojis: "🇺🇸 🇯🇵 🇯🇯"

Country flags comprise sequential regional indicators. Unrecognized sequences
render individually.

| Glyph   | Code Point | UTF-8         | UTF-16      | UTF-32     |
| ------- | ---------- | ------------- | ----------- | ---------- |
| 🇺       | `1F1FA`    | `F0 9F 87 BA` | `D83C DDFB` | `0001F1FA` |
| 🇸       | `1F1F8`    | `F0 9F 87 B8` | `D83C DDFC` | `0001F1F8` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| 🇯       | `1F1EF`    | `F0 9F 87 AF` | `D83C DDEF` | `0001F1EF` |
| 🇵       | `1F1F5`    | `F0 9F 87 B5` | `D83C DDF5` | `0001F1F5` |
| _Space_ | `0020`     | `20`          | `0020`      | `00000020` |
| 🇯       | `1F1EF`    | `F0 9F 87 AF` | `D83C DDEF` | `0001F1EF` |
| 🇯       | `1F1EF`    | `F0 9F 87 AF` | `D83C DDEF` | `0001F1EF` |

### Flag Tag Sequence: "🏴󠁧󠁢󠁳󠁣󠁴󠁿"

The flag of scotland comprises a black flag code point, then tag codepoints for
GBSCT (Great Britain Scotland), then a cancel tag code point.

| Glyph                      | Code Point | UTF-8         | UTF-16      | UTF-32     |
| -------------------------- | ---------- | ------------- | ----------- | ---------- |
| 🏴                         | `1F3F4`    | `F0 9F 8F B4` | `D83C DFF4` | `0001F3F4` |
| _Tag Latin Small Letter G_ | `E0067`    | `F3 A0 81 87` | `DB40 DDC7` | `000E0067` |
| _Tag Latin Small Letter B_ | `E0062`    | `F3 A0 81 82` | `DB40 DDC2` | `000E0062` |
| _Tag Latin Small Letter S_ | `E0073`    | `F3 A0 81 93` | `DB40 DDD3` | `000E0073` |
| _Tag Latin Small Letter C_ | `E0063`    | `F3 A0 81 83` | `DB40 DDC3` | `000E0063` |
| _Tag Latin Small Letter T_ | `E0074`    | `F3 A0 81 94` | `DB40 DDD4` | `000E0074` |
| _Tag Cancel_               | `E007F`    | `F3 A0 81 BF` | `DB40 DDD5` | `000E007F` |

## Programming Language Strings

| **Group**  | **Language** | **Released** | **String Encoding** | **Length Operation**   | **Index Operation**            | **Notes**                                       |
| ---------- | ------------ | ------------ | ------------------- | ---------------------- | ------------------------------ | ----------------------------------------------- |
| Web        | JavaScript   | 1995         | UTF-16              | UTF-16 code units      | UTF-16 code unit               | UCS-2 internally, UTF-16 compatibility.         |
|            | Dart         | 2011         | UTF-16              | UTF-16 code units      | UTF-16 code unit               |                                                 |
|            | TypeScript   | 2012         | UTF-16              | UTF-16 code units      | UTF-16 code unit               |                                                 |
| JVM        | Java         | 1995         | UTF-16              | UTF-16 code units      | UTF-16 code unit               | Unicode-compatible.                             |
|            | Scala        | 2003         | UTF-16              | UTF-16 code units      | UTF-16 code unit               | JVM-based.                                      |
|            | Clojure      | 2007         | UTF-16              | UTF-16 code units      | UTF-16 code unit               |                                                 |
|            | Kotlin       | 2011         | UTF-16              | UTF-16 code units      | UTF-16 code unit               | Inherits JVM encoding behavior.                 |
| Scripting  | Perl         | 1987         | ASCII or UTF-8      | characters             | character                      | Encoding context-dependent.                     |
|            | Bash         | 1989         | None                | bytes                  | byte                           | Strings are plain byte sequences.               |
|            | Lua          | 1993         | None                | bytes                  | byte                           | Strings are immutable byte sequences.           |
|            | PHP          | 1995         | ASCII/ISO-8859-1    | bytes                  | byte                           | Supports multibyte encodings via extensions.    |
|            | Ruby         | 1995         | UTF-8               | characters             | character                      | Default UTF-8, multibyte support.               |
|            | Python 2     | 2000         | ASCII (default)     | bytes                  | byte                           | `str` is raw bytes; Unicode must use `unicode`. |
|            | Python 3     | 2008         | UTF-8               | characters             | character                      | `str` is Unicode by default.                    |
| Functional | Haskell      | 1990         | UTF-8               | characters             | character                      | `String` is a list of characters.               |
|            | Erlang       | 1986         | None/UTF-8          | elements               | An integer representing a byte | Strings are lists of integers (bytes).          |
|            | Elixir       | 2011         | UTF-8               | characters             | character                      | Strings are UTF-8 binaries.                     |
|            | OCaml        | 1996         | UTF-8               | bytes                  | byte                           | Strings are immutable byte sequences.           |
| Mid-Level  | Go           | 2009         | UTF-8               | bytes                  | byte                           | Strings are immutable byte slices.              |
|            | Objective-C  | 1984         | UTF-8/UTF-16        | characters             | character (NSString)           | Multibyte support (NSString defaults).          |
|            | Swift        | 2014         | UTF-8               | characters             | extended grapheme cluster      | Optimized for Unicode compliance.               |
|            | C#           | 2000         | UTF-16              | UTF-16 code units      | UTF-16 code unit               | Unicode-compliant, CLR-dependent.               |
| Low-Level  | C            | 1972         | None                | bytes (excluding null) | byte                           | Strings are null-terminated byte arrays.        |
|            | C++          | 1985         | None                | bytes                  | byte                           | `std::string` does not enforce encoding.        |
|            | Rust         | 2010         | UTF-8               | characters             | Unicode scalar value           | Safe, modern systems language.                  |
|            | Zig          | 2016         | None                | bytes                  | byte                           | Strings are byte arrays                         |
| Data/Math  | R            | 1993         | UTF-8               | characters             | character                      | Unicode-supported via UTF-8.                    |
|            | Julia        | 2012         | UTF-8               | characters             | character                      | Unicode-compliant strings.                      |
|            | MATLAB       | 1984         | UTF-16              | characters             | character                      | Unicode support for matrices.                   |
|            | Fortran      | 1957         | None                | bytes (raw data)       | byte                           | Encoding depends on the implementation.         |
| SQL        | MySQL        | 1995         | UTF-8 or Specified  | characters             | character                      | Configuration allows multiple encodings.        |
|            | PostgreSQL   | 1996         | UTF-8 or Specified  | characters             | character                      | UTF-8 strongly recommended.                     |
|            | SQLite       | 2000         | UTF-8 or UTF-16     | characters             | character                      | Unicode support baked into engine.              |
|            | Oracle       | 1979         | UTF-8 or Specified  | bytes or characters    | byte or character              | Supports legacy and modern encodings.           |
|            | SQL Server   | 1989         | UCS-2/UTF-16        | UTF-16 code units      | UTF-16 code unit               | Dependent on NVARCHAR vs VARCHAR types.         |

TODO: What does it mean for Javascript to be UCS-2 internally, UTF-16
compatibility.

## Web

- HTTP
- HTML
- CSS
- JavaScript
- JSON
- Markdown

## Rendering

- glyphs
- fonts
- icon fonts
- missing code points
- Ligatures (>= renders as a single glyph ≥) and arabic letters connect

## Practical Knowledge

- Windows
- WASM
- Web
- Conversion
- Escape Sequences

- UCS-2, UCS-4
- WTF-8, WTF-16, WTF-32
- Punycode

### Safe Operations

Can you safely concatenate, trim, and split utf8/utf16/utf32 strings as bytes
and/or code units? Which operations do you need a library for?

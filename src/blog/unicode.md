---
title: Unicode By Table
description: Learn Unicode with data tables
draft: true
created: 2025-01-05
features: ["toc"]
---

This post explains [Unicode](https://www.unicode.org/versions/latest/core-spec/)
using data tables.

If you don't like tables, read
["The Absolute Minimum Every Software Developer Must Know About Unicode in 2023"](https://tonsky.me/blog/unicode/)
instead.

### Code Points

Unicode assigns linguistic meaning to numbers called code points. Code points
are written in hexadecimal by convention.

| Glyph | Code Point | Unicode Name                         |
| ----- | ---------- | ------------------------------------ |
| A     | 41         | Latin Capital Letter A               |
| a     | 61         | Latin Small Letter A                 |
| å     | E5         | Latin Small Letter A With Ring Above |
| ا     | 627        | Arabic Letter Alef                   |
| ❤️    | 2764       | Heavy Black Heart                    |
| ́      | 301        | Combining Acute Accent               |

Unicode is a living standard.
[Unicode 16.0.0](https://www.unicode.org/versions/Unicode16.0.0/#Summary) was
announced on 2024-09-10 and added 5,185 code points.

| Valid Code Point Range | Total Numbers | Assigned Numbers | Assigned Percentage |
| ---------------------- | ------------- | ---------------- | ------------------- |
| 0 - 10FFFF             | 1,112,064     | 154,998          | 13.94%              |

### Planes

Unicode organizes code points into 17 "planes" of 2^16 (or 65,536) numbers each.
Planes have specified purposes.

TODO: Determine number of assigned code points per plane by processing UCD like
https://cor3ntin.github.io/posts/cp_to_name/

| Plane | Name                                   | Code Points     | Description                                             |
| ----- | -------------------------------------- | --------------- | ------------------------------------------------------- |
| 0     | Basic Multilingual Plane (BMP)         | 000000 – 00FFFF | Common characters, including modern scripts and symbols |
| 1     | Supplementary Multilingual Plane (SMP) | 010000 – 01FFFF | Less common languages and historic scripts              |
| 2     | Supplementary Ideographic Plane (SIP)  | 020000 – 02FFFF | Additional Chinese Japanese Korean (CJK) ideographs     |
| 3     | Tertiary Ideographic Plane (TIP)       | 030000 – 03FFFF | Rare ideographs                                         |
| 4     |                                        | 040000 – 04FFFF | Unassigned                                              |
| 5     |                                        | 050000 – 05FFFF | Unassigned                                              |
| 6     |                                        | 060000 – 06FFFF | Unassigned                                              |
| 7     |                                        | 070000 – 07FFFF | Unassigned                                              |
| 8     |                                        | 080000 – 08FFFF | Unassigned                                              |
| 9     |                                        | 090000 – 09FFFF | Unassigned                                              |
| 10    |                                        | 0A0000 – 0AFFFF | Unassigned                                              |
| 11    |                                        | 0B0000 – 0BFFFF | Unassigned                                              |
| 12    |                                        | 0C0000 – 0CFFFF | Unassigned                                              |
| 13    |                                        | 0D0000 – 0DFFFF | Unassigned                                              |
| 14    | Supplementary Special-purpose Plane    | 0E0000 – 0EFFFF | Special-purpose characters like tags                    |
| 15    | Supplementary Private Use Area-A       | 0F0000 – 0FFFFF | Private use for custom characters                       |
| 16    | Supplementary Private Use Area-B       | 100000 – 10FFFF | Private use for custom characters                       |

### Blocks

Each plane is subdivided into variable-length "blocks" of related characters.
The BMP (Plane 0) comprises these blocks:

| Range     | Block                       | Range     | Block                                   | Range     | Block                                | Range     | Block                         |
| --------- | --------------------------- | --------- | --------------------------------------- | --------- | ------------------------------------ | --------- | ----------------------------- |
| 0000-007F | Basic Latin                 | 1400-167F | Unified Canadian Aboriginal Syllabics   | 2700-27BF | Dingbats                             | A500-A63F | Vai                           |
| 0080-00FF | Latin-1 Supplement          | 1680-169F | Ogham                                   | 27C0-27EF | Miscellaneous Mathematical Symbols-A | A640-A69F | Cyrillic Extended-B           |
| 0100-017F | Latin Extended-A            | 16A0-16FF | Runic                                   | 27F0-27FF | Supplemental Arrows-A                | A6A0-A6FF | Bamum                         |
| 0180-024F | Latin Extended-B            | 1700-171F | Tagalog                                 | 2800-28FF | Braille Patterns                     | A700-A71F | Modifier Tone Letters         |
| 0250-02AF | IPA Extensions              | 1720-173F | Hanunoo                                 | 2900-297F | Supplemental Arrows-B                | A720-A7FF | Latin Extended-D              |
| 02B0-02FF | Spacing Modifier Letters    | 1740-175F | Buhid                                   | 2980-29FF | Miscellaneous Mathematical Symbols-B | A800-A82F | Syloti Nagri                  |
| 0300-036F | Combining Diacritical Marks | 1760-177F | Tagbanwa                                | 2A00-2AFF | Supplemental Mathematical Operators  | A830-A83F | Common Indic Number Forms     |
| 0370-03FF | Greek and Coptic            | 1780-17FF | Khmer                                   | 2B00-2BFF | Miscellaneous Symbols and Arrows     | A840-A87F | Phags-pa                      |
| 0400-04FF | Cyrillic                    | 1800-18AF | Mongolian                               | 2C00-2C5F | Glagolitic                           | A880-A8DF | Saurashtra                    |
| 0500-052F | Cyrillic Supplement         | 1900-194F | Limbu                                   | 2C60-2C7F | Latin Extended-C                     | A8E0-A8FF | Devanagari Extended           |
| 0530-058F | Armenian                    | 1950-197F | Tai Le                                  | 2C80-2CFF | Coptic                               | A900-A92F | Kayah Li                      |
| 0590-05FF | Hebrew                      | 1980-19DF | New Tai Lue                             | 2D00-2D2F | Georgian Supplement                  | A930-A95F | Rejang                        |
| 0600-06FF | Arabic                      | 19E0-19FF | Khmer Symbols                           | 2D30-2D7F | Tifinagh                             | A960-A97F | Hangul Jamo Extended-A        |
| 0700-074F | Syriac                      | 1A00-1A1F | Buginese                                | 2D80-2DDF | Ethiopic Extended                    | A980-A9DF | Javanese                      |
| 0750-077F | Arabic Supplement           | 1AB0-1AFF | Combining Diacritical Marks Extended    | 2DE0-2DFF | Cyrillic Extended-A                  | AA00-AA5F | Cham                          |
| 0780-07BF | Thaana                      | 1B00-1B7F | Balinese                                | 2E00-2E7F | Supplemental Punctuation             | AA60-AA7F | Myanmar Extended-A            |
| 07C0-07FF | NKo                         | 1B80-1BBF | Sundanese                               | 2E80-2EFF | CJK Radicals Supplement              | AA80-AADF | Tai Viet                      |
| 0800-083F | Samaritan                   | 1BC0-1BFF | Batak                                   | 2F00-2FDF | Kangxi Radicals                      | AAE0-AAFF | Meetei Mayek Extensions       |
| 0840-085F | Mandaic                     | 1C00-1C4F | Lepcha                                  | 2FF0-2FFF | Ideographic Description Characters   | AB00-AB2F | Ethiopic Extended-A           |
| 0860-086F | Syriac Supplement           | 1C50-1C7F | Ol Chiki                                | 3000-303F | CJK Symbols and Punctuation          | AB30-AB6F | Latin Extended-E              |
| 0870-089F | Arabic Extended-B           | 1C80-1C8F | Cyrillic Extended-C                     | 3040-309F | Hiragana                             | AC00-D7AF | Hangul Syllables              |
| 08A0-08FF | Arabic Extended-A           | 1C90-1CBF | Georgian Extended                       | 30A0-30FF | Katakana                             | D7B0-D7FF | Hangul Jamo Extended-B        |
| 0900-097F | Devanagari                  | 1CC0-1CCF | Sundanese Supplement                    | 3100-312F | Bopomofo                             | D800-DB7F | High Surrogates               |
| 0980-09FF | Bengali                     | 1CD0-1CFF | Vedic Extensions                        | 3130-318F | Hangul Compatibility Jamo            | DB80-DBFF | High Private Use Surrogates   |
| 0A00-0A7F | Gurmukhi                    | 1D00-1D7F | Phonetic Extensions                     | 3190-319F | Kanbun                               | DC00-DFFF | Low Surrogates                |
| 0A80-0AFF | Gujarati                    | 1D80-1DBF | Phonetic Extensions Supplement          | 31A0-31BF | Bopomofo Extended                    | E000-F8FF | Private Use Area              |
| 0B00-0B7F | Oriya                       | 1DC0-1DFF | Combining Diacritical Marks Supplement  | 31C0-31EF | CJK Strokes                          | F900-FAFF | CJK Compatibility Ideographs  |
| 0B80-0BFF | Tamil                       | 1E00-1EFF | Latin Extended Additional               | 31F0-31FF | Katakana Phonetic Extensions         | FB00-FB4F | Alphabetic Presentation Forms |
| 0C00-0C7F | Telugu                      | 1F00-1FFF | Greek Extended                          | 3200-32FF | Enclosed CJK Letters and Months      | FB50-FDFF | Arabic Presentation Forms-A   |
| 0C80-0CFF | Kannada                     | 2000-206F | General Punctuation                     | 3300-33FF | CJK Compatibility                    | FE00-FE0F | Variation Selectors           |
| 0D00-0D7F | Malayalam                   | 2070-209F | Superscripts and Subscripts             | 3400-4DBF | CJK Unified Ideographs Extension A   | FE10-FE1F | Vertical Forms                |
| 0D80-0DFF | Sinhala                     | 20A0-20CF | Currency Symbols                        | 4DC0-4DFF | Yijing Hexagram Symbols              | FE20-FE2F | Combining Half Marks          |
| 0E00-0E7F | Thai                        | 20D0-20FF | Combining Diacritical Marks for Symbols | 4E00-9FFF | CJK Unified Ideographs               | FE30-FE4F | CJK Compatibility Forms       |
| 0E80-0EFF | Lao                         | 2100-214F | Letterlike Symbols                      | A000-A48F | Yi Syllables                         | FE50-FE6F | Small Form Variants           |
| 0F00-0FFF | Tibetan                     | 2150-218F | Number Forms                            | A490-A4CF | Yi Radicals                          | FE70-FEFF | Arabic Presentation Forms-B   |
| 1000-109F | Myanmar                     | 2190-21FF | Arrows                                  | A4D0-A4FF | Lisu                                 | FF00-FFEF | Halfwidth and Fullwidth Forms |
| 10A0-10FF | Georgian                    | 2200-22FF | Mathematical Operators                  | A500-A63F | Vai                                  | FFF0-FFFF | Specials                      |
| 1100-11FF | Hangul Jamo                 | 2300-23FF | Miscellaneous Technical                 | A640-A69F | Cyrillic Extended-B                  |           |                               |
| 1200-137F | Ethiopic                    | 2400-243F | Control Pictures                        | A6A0-A6FF | Bamum                                |           |                               |
| 1380-139F | Ethiopic Supplement         | 2440-245F | Optical Character Recognition           | A700-A71F | Modifier Tone Letters                |           |                               |
| 13A0-13FF | Cherokee                    | 2460-24FF | Enclosed Alphanumerics                  | A720-A7FF | Latin Extended-D                     |           |                               |

Certain ranges cannot be assigned. TODO: different types of characters/code
points defined by unicode.

| Unusable Ranges                                  | Purpose                           |
| ------------------------------------------------ | --------------------------------- |
| 0000 - 001F, 007F - 009F                         | Control Characters (ASCII and C1) |
| D800 - DFFF                                      | Surrogate range (reserved)        |
| E000 - F8FF                                      | BMP Private Use Area              |
| F0000 - FFFFD, 100000 - 10FFFD                   | Supplementary Private Use Areas   |
| FDD0 - FDEF                                      | Noncharacters in BMP (middle)     |
| FFFE - FFFF                                      | Noncharacters in BMP (end)        |
| XXFFFE - XXFFFF for XX in \{01, 02, ..., 0F, 10} | Noncharacters in Planes 1 to 16   |

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

[Determining which sequences combine into one grapheme is hard.](https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)

### Normalization

A grapheme may have multiple representations.

| Grapheme Glyph | Code Points | Code Point Glyphs |
| -------------- | ----------- | ----------------- |
| é              | 233         | é                 |
| é              | 65 301      | e ◌́               |

There may be more than one combining mark.

| Grapheme Glyph | Code Points | Code Point Glyphs |
| -------------- | ----------- | ----------------- |
| श्र             | 931         | श्र                |
| श्र             | 933 94D 930 | श ◌् र             |

Combining marks may be reordered.

| Grapheme Glyph | Code Points | Code Point Glyphs |
| -------------- | ----------- | ----------------- |
| n̂́              | 110 770 769 | n ◌̂ ◌́             |
| n̂́              | 110 769 770 | n ◌́ ◌̂             |

This makes comparsing and searching strings hard. You need a library to get it
right.

### TODO

Surrogates (as accidents of history), Unicode Scalar Values (USVs) as code
points that aren't surrogates, WTF-16, interoperatbility between UTF-16 and
WTF-16, Web assembly strings

### Indistinguishable Glyphs

Some graphemes may be semantically different but visually indistinguishable.

### Locale Dependent Glyphs

### Sorting and Searching

### Character Normalization

### TODO

- Scripts
- Collation
- Casing
- Which string operations require knowledge of encoding? For example, as long as
  two strings have the same encoding, regardless of which, they can be safely
  concatenated.

### Character Composition

### Collation

### Directionality

## Unicode Encodings

### UTF-8

UTF-8 constructs code points from 1 to 4 code units of 1 byte each. Each byte is
split into header bits and data bits.

Encodings are sparse; not all bit permutations are valid.

| Code Points    | Invalid Range | Total Code Points | Code Unit 1   | Code Unit 2   | Code Unit 3   | Code Unit 4   |
| -------------- | ------------- | ----------------- | ------------- | ------------- | ------------- | ------------- |
| 0000 - 007F    |               | 128               | **0**xxx xxxx |               |               |               |
| 0080 - 07FF    |               | 1,920             | **110**x xxxx | **10**xx xxxx |               |               |
| 0800 - FFFF    | D800 - DFFF   | 61,440            | **1110** xxxx | **10**xx xxxx | **10**xx xxxx |               |
| 10000 - 10FFFF |               | 1,048,576         | **1111 0**xxx | **10**xx xxxx | **10**xx xxxx | **10**xx xxxx |

Code points are directly packed into data bits.

| Glyph | Code Point | Code Point (Binary)         | Code Unit 1   | Code Unit 2   | Code Unit 3   | Code Unit 4   |
| ----- | ---------- | --------------------------- | ------------- | ------------- | ------------- | ------------- |
| z     | 7A         | 111 1010                    | **0**111 1010 |               |               |               |
| ¢     | A2         | 0 0010 10 0010              | **110**0 0010 | **10**10 0010 |               |               |
| €     | 20AC       | 0010 00 0010 10 1100        | **1110** 0010 | **10**00 0010 | **10**10 1100 |               |
| 𐒩     | 104A9      | 000 01 0000 01 0010 10 1001 | **1111 0**000 | **10**01 0000 | **10**01 0010 | **10**10 1001 |

### UTF-16

UTF-16 constructs code points from 1 or 2 code units of 2 bytes each.

| Code Points    | Invalid Range | Total Code Points | Code Unit 1             | Code Unit 2             |
| -------------- | ------------- | ----------------- | ----------------------- | ----------------------- |
| 0000 - FFFF    | D800 - DFFF   | 63,488            | xxxx xxxx xxxx xxxx     |                         |
| 10000 - 10FFFF |               | 1,048,576         | **1101 10**xx xxxx xxxx | **1101 11**xx xxxx xxxx |

Code points 0000 - FFFF are directly packed into data bits.

| Glyph | Code Point | Code Point (Binary) | Code Unit 1         |
| ----- | ---------- | ------------------- | ------------------- |
| z     | 7A         | 0000 0000 0111 1010 | 0000 0000 0111 1010 |
| €     | 20AC       | 0010 0000 1010 1100 | 0010 0000 1010 1100 |

Code points 10000 - 10FFFF are subtracted by 0x10000 then packed into data bits.

| Glyph | Code Point | Code Point - 0x10000 | Code Point - 0x10000 (Binary) | Code Unit 1             | Code Unit 2             |
| ----- | ---------- | -------------------- | ----------------------------- | ----------------------- | ----------------------- |
| 𐒩     | 104A9      | 4A9                  | 00 0000 0001 00 1010 1001     | **1101 10**00 0000 0001 | **1101 11**00 1010 1001 |
| 嶲    | 2F9F4      | 1F9F4                | 00 0111 1110 01 1111 0100     | **1101 10**00 0111 1110 | **1101 11**01 1111 0100 |

When 2 code units are used, code unit 1 is the "high surrogate" and code unit 2
is the "low surrogate". Together they form a "surrogate pair".

### UTF-32

UTF-32 constructs code points from 1 code unit of 4 bytes.

| Code Points   | Invalid Range | Total Code Points | Code Unit 1                             |
| ------------- | ------------- | ----------------- | --------------------------------------- |
| 0000 - 10FFFF | D800 - DFFF   | 1,112,064         | xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx |

All code points are directly packed into data bits.

| Glyph | Code Point | Code Point (Binary)                     | Code Unit 1                             |
| ----- | ---------- | --------------------------------------- | --------------------------------------- |
| z     | 7A         | 0000 0000 0000 0000 0000 0000 0111 1010 | 0000 0000 0000 0000 0000 0000 0111 1010 |
| ¢     | A2         | 0000 0000 0000 0000 0000 0000 1010 0010 | 0000 0000 0000 0000 0000 0000 1010 0010 |
| €     | 20AC       | 0000 0000 0000 0000 0010 0000 1010 1100 | 0000 0000 0000 0000 0010 0000 1010 1100 |
| 𐒩     | 104A9      | 0000 0000 0000 0001 0000 0100 1010 1001 | 0000 0000 0000 0001 0000 0100 1010 1001 |
| 嶲    | 2F9F4      | 0000 0000 0000 0010 1111 1001 1111 0100 | 0000 0000 0000 0010 1111 1001 1111 0100 |

## Other Text Encodings

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

### Punycode

TODO

### UTF-7

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
| Web        | JavaScript   | 1995         | UTF-16              | code units             | code unit                      | UCS-2 internally, compatibility.                |
|            | Dart         | 2011         | UTF-16              | code units             | code unit                      |                                                 |
|            | TypeScript   | 2012         | UTF-16              | code units             | code unit                      |                                                 |
| JVM        | Java         | 1995         | UTF-16              | code units             | code unit                      | Unicode-compatible.                             |
|            | Scala        | 2003         | UTF-16              | code units             | code unit                      | JVM-based.                                      |
|            | Clojure      | 2007         | UTF-16              | code units             | code unit                      |                                                 |
|            | Kotlin       | 2011         | UTF-16              | code units             | code unit                      | Inherits JVM encoding behavior.                 |
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
|            | C#           | 2000         | UTF-16              | code units             | code unit                      | Unicode-compliant, CLR-dependent.               |
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
|            | SQL Server   | 1989         | UCS-2/UTF-16        | code units             | code unit                      | Dependent on NVARCHAR vs VARCHAR types.         |

TODO: What does it mean for Javascript to be UCS-2 internally, UTF-16
compatibility.

## Web

- URLs
  - paths
  - domains
- HTTP
- HTML
  - header
  - meta tag
- JavaScript
  - String literals
    - escape sequences
  - Regular Expressions
    - escape sequences
    - unicode aware vs unicode-unaware modes
  - Identifiers
    - valid and invalid identifiers
  - Base64 strings
  - Encoding and Decoding with TextEncoder and TextDecoder
- CSS
- JSON
  - Byte Order Mark
    https://mobiarch.wordpress.com/2022/12/10/lets-talk-about-json-and-character-encoding/
  - Unicode escape sequences
- Markdown
- Data URLs

## Files and OSs

- Fonts and Unicode
  - TrueType
  - OpenType
  - WOFF
  - WOFF2

- Text Files
  - Byte Order Mark
    https://mobiarch.wordpress.com/2022/12/10/lets-talk-about-json-and-character-encoding/
- File paths
  - windows (wtf-16), linux (bytes), osx
- Shells
  - Environment variables
  - Shell escaping
  - Command line arguments
- Programming languages
  - String representations
    - Alias for or just a plain byte array, e.g. C, Zig
    - Sequence of unvalidated bytes but distinct from byte array type, e.g.
      Odin?
    - Sequence of utf-8 code units, e.g. Rust
    - Sequence of utf-16 code units, e.g. Javascript (mostly)
    - Sequence of code points (or equivalently utf-32 code units), basically
      nobody
    - Sequence of grapheme clusters, e.g. Swift

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
- Code Point Private Use Areas

- UCS-2, UCS-4
- WTF-8, WTF-16, WTF-32; see https://github.com/ziglang/zig/pull/19005
- Punycode

### Safe Operations

Can you safely concatenate, trim, and split utf8/utf16/utf32 strings as bytes
and/or code units? Which operations do you need a library for?

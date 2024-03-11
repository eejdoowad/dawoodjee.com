---
title: Dark Mode Sucks
draft: true
created: 2024-02-20
---

It's the year 2020. Pandemic hermits spend eye-watering amounts of time staring
at screens. A light bulb brightens in the collective conscience of designers
around the world. You know what would make our eyes water a little less? Dark
Mode.

I don’t like Dark Mode, and I tick (or don’t) the boxes needed to keep it off on
all my devices and apps. The problem is that while it helps reduce eye strain in
theory, it’s just plain annoying in practice, at least with the implementations
that roam in the wild today.

Light mode is better for bright conditions, particularly for monitors that don't
get bright enough, Dark mode is better for dark conditions. Many screens are bad
at showing the contrast between dark colors, which leads to bad user experience,
e.g. you might entirely skip horror movies or video games because you can't see
anything, and many nintendo games are bright at least partially because switch
screens aren't are terrible for dark colors. Example: screenshot of my monitor
on a bright day on logseq.com while wearing bright clothes and then with colors
inverted.

Problems in websites:

- Dark mode is not available on all websites.
- Dark mode is often partially broken
- Dark mode is a poorly executed afterthought
- Turning dark mode on/off is annoying, and either uses valuable screen real
  estate or is hidden behind a menu you don't know exists.

Problems in web browser UI:

Because many websites don't support dark mode, users who truly care about dark
mode must rely on OS support for dark mode, and if they rely on OS support for
dark mode, then supporting dark mode in website builders is less valuable (and
might not be worthwhile compared to investing your time in useful features).
That's not to say it's never wortwhile; I wouldn't use a text editor that did
not support a dark theme because I spend so much time looking at and interacting
with mine. But if you're a team building an app with lots of distinct UI
surfaces, or if you're an individual building a low-effort personal website,
think carefully about whether you're willing and able to invest in designing an
accessible dark mode and continuously validating all its permutations. It's easy
to forget to test dark mode when you build a new feature, easy to miss
presentational corner cases, and hard to catch regressions because... let' be
honest, you probably don't have snapshot tests at all, must less _dark mode
snapshot tests_.

Dark mode toggle should be button in browser UI, not a random button implemented
differently on each website.

What I do instead: OS color inversion and hotkey (cmd+option+8 on mac and triple
click on iOS).

My Dark mode setup

- OSX
  - Appearance: Light
  - Wallpaper: white (so titlebar inverts properly)
  - Accent color: Graphite
  - Allow wallpaper tinting in windows: off
  - Invert colors mode: Smart
  - Invert colors keyboard shortcut: `cmd + option + 8`

- Firefox
  - Website appearance: Light
  - Theme: Light

- VSCode
  - Theme: Dark Modern (Red text on white background in the Light themes is hard
    for me to see, and smart invert makes it impossible to distinguish different
    highlight colors, so i turn off smart invert)

- Usage
  - When in low-light conditions, I use my keyboard shortcut to turn on Smart
    Invert colors
  - When in VSCode, if Smart Invert is on, I use my keyboard shortcut to turn it
    off
  - Everything else is done in my default (light appearance) settings

- Main problems
  - Images are inverted and this can ruin photographs, so I have to reset
  - Contrast of dark colors can still be too low

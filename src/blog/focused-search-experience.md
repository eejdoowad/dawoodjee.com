---
title: Focused Search Experience
description: How and why I remove distractions from my search experience
created: 2024-03-07
---

Focus is precious. It's a necessary ingredient of usefully invested time, but
comes in short supply and wastes easily, which means it should be guarded and
used strategically.

Distraction is a major cause of waste. I've taken measures to fight distractions
in my search experience because my useful work involves lots of searching.

## Overview

This is my search experience:

<video controls src="/img/focused-search-experience/preview.webm" ></video>

And this is how it works:

- [Google Programmable Search Engine](https://programmablesearchengine.google.com)
  - Search results only includes links and not multimedia or suggestions
  - Custom filters remove distracting and low-value websites from search results
- [uBlock Origin](https://ublockorigin.com)
  - Blocks search ads
  - Custom filter rules hide UI elements that aren't useful to me
  - Custom filter rules restyle UI elements for better usability
- [Firefox](https://www.mozilla.org/en-US/firefox/new/)
  - Toolbar customized to hide distracting UI elements
  - Searchbar customized to disable all suggestions
  - Search engine configured to use my custom search engine by default

## Google Programmable Search Engine

I'm surprised Google wants anyone to user a search engine that's not google.com,
but Programmable Search Engine exists, somehow. It competes with the likes of
Algolia by offering customized website search as a service, but it also works as
a standalone search tool.

This is how it compares to google.com:

Pros

- It's free, so there's no need to maintain a subscription like with
  [Kagi](https://kagi.com/)
- Search results are instant
- Search results are relevant
- It supports filtering custom domains from search results
- It doesn't have distracting anti-features like multi-media results, related
  searches, favicons, embedded YouTube player

Cons

- More frequent anti-bot protections, which require manual interaction to bypass
- No support for time range filters, e.g. only show results from past month
- Lack of useful built-in tools like: calculator, dictionary, weather forecast,
  unit conversions, time and date tools, etc.
- No support for personalized search results, but I don't mind since
  personalized results usually reinforce my bad habits.

[My custom search engine](https://cse.google.com/cse?cx=b08029aadeb444a97)
configuration filters out websites that make life worse for various reasons.

- Some websites are too engaging, leading to addiction and doom scrolling. Since
  we can't have a healthy relationship, it's better to eliminate temptation by
  removing them from notice.
- Some websites have mostly low quality content, so you're better off looking
  elsewhere. Sometimes websites are SEO content farms. Other times content is
  user generated, and the low barrier to entry leads to "the blind leading the
  blind." I wish there was a way to block all domains in the Medium syndicate.
- Some websites are walled gardens. I'd rather not create an account and
  sacrifice my privacy to access them.
- Some websites use intrusive dark patterns that render their content not worth
  the painful user experience.

This is my current blocklist:

```
*.itnext.io/*
*.dev.to/*
*.tiktok.com/*
*.quora.com/*
*.w3schools.com/*
*.facebook.com/*
*.pinterest.com/*
*.instagram.com/*
*.medium.com/*
*.linkedin.com/*
*.twitter.com/*
*.ycombinator.com/*
*.reddit.com/*
```

I also updated my custom search engine to return 20 results per page instead of
the default 10 to reduce the need to click the next page button.

## uBlock Origin

The user experience of Google Programmable Search Engine is terrible because ads
use up the entire viewport on the results page, forcing users to scroll down to
see any results.

![A search shows nothing but ads](/img/focused-search-experience/ads.avif)

Examples like this show how the quest for monetization has rendered the web
unusable. Ad blockers exist to defend ourselves from this malpractice.

uBlock Origin is _the_ content blocking web extension. It blocks ads on the
search results page by default. This is the result.

![A search with uBlock Origin shows results, not ads](/img/focused-search-experience/no-ads.avif)

Much better! But it can be refined further:

- The blue search button is useless to me because I always submit my searches
  using the "Enter" key.
- The "x" button is useless to me because I never clear the search query.
- The "About X results (Y seconds)" notice is useless to me. I don't care unless
  something went wrong.
- The "Sort by relevance/recency" toggle is useless because the recency sort is
  useless. What I really want is a time range filter.
- There's additional Google branding at the bottom of the page I don't care
  about.
- Because results are aligned to the left side of the viewport, I have to turn
  my head or eyes to see them. Center alignment is more ergonomic.

This is the result:

![Search UX without distractions](/img/focused-search-experience/preview.avif)

And these are the underlying uBlock Origin filters:

```
cse.google.com##body:style(width: 580px; margin: auto)
cse.google.com###cse-search-form:style(width: 580px !important; padding: 0 12px !important)
cse.google.com##.gsib_b,.gsc-search-button,.gsc-above-wrapper-area
cse.google.com##.gsc-adBlock,#cse-footer,.gcsc-find-more-on-google-branding
```

Unfortunately, there's no way to get around the reCAPTCHA.

![I hate reCAPTCHA](/img/focused-search-experience/recaptcha.avif)

## Firefox

Almost all of my searches begin in Firefox, which I use because it best supports
uBlock Origin
[today](https://github.com/gorhill/uBlock?tab=readme-ov-file#firefox) and in the
[long term](https://github.com/uBlockOrigin/uBlock-issues/issues/338).

I start by typing `cmd + L` to select Firefox's search bar and begin typing my
query. Helpful suggestions appear to save me keystrokes and send me where I want
to go.

![Search dialog with lots of annoying suggestions](/img/focused-search-experience/suggestions.avif)

I lied. The default suggestions UI is terrible for the usual reason,
monetization. I actually don't want any suggestions.

- History suggestions are likely to reinforce bad habits as they guide me back
  toward irresistible, mindless entertainment.
- On the infrequent occasion when I need it, dedicated bookmark search works
  great.
- Searching for tabs means I have too many tabs open and can't keep track of
  them.
- Search engine completions are likely to drive me on a tangent, so I'd rather
  do the work to type the query myself.
- Why are there colorful pictures in my search suggestions? I'm not here for
  them, but I can't not look.
- How could I not want shopping suggestions from online retailers???

Firefox makes it somewhat tedious, but I was able to disable all suggestions. In
the process, I also set the default search engine to my custom search engine and
switched to a light browser theme.

![Search dialog with lots of annoying suggestions](/img/focused-search-experience/no-suggestions.avif)

## What's next?

Mission accomplished. I created a distraction-free search experience.

But it's sad to think about the lost potential of people without the ability or
determination to take similar measures. While a few people might come across
this post and learn a trick or two to better their search experience, I think it
would be far more valuable to the world if there were a more accessible way to
apply anti-distraction measures. I shared some thoughts on this in
[my Web Agency post](/blog/web-agency).

If I could wave a magic wand to change one thing in my setup, it would be for
Safari to support the web extension APIs needed by uBlock Origin. I like the
minimalism of desktop Safari's controversial compact-mode UI, which embeds the
search bar in the active tab widget and themes the toolbar to blend in with the
current website.

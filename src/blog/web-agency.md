---
title: Web Agency
created: 2024-02-23
tags:
  - ux
  - web
  - design
  - programming
---

_This is a post about giving individuals agency over their web browsing
experience._

Reader mode is a fantastic browser feature because it standardizes how content
is displayed across disparate websites, removing distracting clutter and the
need to learn the bespoke UI of each website. RSS readers take this concept to
its extreme by automatically providing a standardized feed of content, removing
the need to navigate custom UIs to find content. Which is great when you know
before-hand what content you care about, but doesn't address the need for
content-on-demand. If you're listening to a song and find yourself interested in
the history behind it, then you'll need to search for it and navigate the web to
find it. It's the year 2024, and you might be able to use an LLM to find the
answer, skipping the whole web maze, but at least for now LLMs I use don't
provide the context or level of trust I want.

So you go through this web maze and each page provides its own unique experience
usually optimized for keeping you in the network or showing you ads. You've
trained yourself to ignore the extraneous, intrusive information and manage to
find the information you want. Or maybe you didn't. Perhaps you clicked on an ad
interleaved with the content you actually care about (e.g. on Google Search or
Reddit) or perhaps you saw a suggestion for a relation question or topic you
might be interested in and followed it, or perhaps a video thumbnail caught your
attention, and before you know it, you forget the original intent of your
search.

Digressing from the negative effects of platform incentives, you might find
yourself on a website that is optimized for conveying the information you want.
But you still have to understand its UI and the presentation might slow you
down; perhaps the text is too small, the font is illegible, the sidebars push
in-network content, there's a like count at the top, there are low-value user
comments, there's a waste-of-(mental)-space stock image at the top... you get
the point. Reader mode is supposed to eliminate these details. But reader mode
doesn't work everywhere, it removes features that help you navigate and interact
in useful ways, its heuristic algorithm sometimes removes content you care
about, and you have to manually enable (and disable) it.

What we really need is a way to standardize the experience of each website to
our preference, with ways to remove specific UI elements we don't care about,
standardize presentational details like fonts and page alignment, and
configurable presets so we don't have to define everything ourselves. Basically,
we need a user-agent that gives me agency over the web in a nice usable package.
For example, I hate profile images because they steal focus use up valuable
space, so I want them all gone across all websites. I want my browser to have a
"turn off profile images across all websites" checkbox. This functionality
doesn't exist because every website is different and there is no universal way
to identify profile images. We actually need to hardcode this logic for every
website, which appears infeasible. But is it really?

The 80/20 rule applies but in this case I think it's really a 99.9/0.01 rule. We
don't need to hardcode logic for every website on the internet, we just need
rules for the tiny minority of websites that account for the majority of use. I
prefer not to see profile images at all, but if they're removed from the top 100
websites I visit, then I only risk seeing them rarely, which is practically
equivalent to never. Great... so I only need to write rules for 100 websites.
I'm lazy, so that's about 100 too many, and I'm unwilling to invest the time
unless I'm on an OCD stint.

What I really want is for something or someone else to do the work of writing
the rules so I can enjoy the fruits of their labor without lifting a finger
myself. I can think of three realistic options:

1. Outsource the work to a hard-working, altruistic benefactor who takes
   ownership of the rules. This is akin to filter lists used by ad blockers.
   Tens of someones do the hard, thankless work of writing and updating these
   lists to save hundreds of millions of people billions of hours annually. In
   big-tech world where quantifying impact is supposedly important, those
   numbers are crazy to think about. If you care about effective charity, then
   maybe these someones deserve something.
2. Crowdsource the rules so that many less hard-working people can contribute a
   little. Wikipedia, SponsorBlock, and crowd-sources translation platforms are
   prominent examples. The challenge here is moderation, preventing abuse, and
   filtering low-quality contributions. SponsorBlock is interesting because
   there is a right answer: given a video timeline, there are specific objective
   time segments containing sponsored ads. This makes crowdsourcing a little
   easier. Wikipedia and crowd-translation platforms are a little tricker and
   require heavier moderation because there is no right answer. I think website
   content rules lean toward the objective, but there are still multiple ways to
   achieve the same result.
3. Have machines devise the rules. What was unachievable just 2 years ago can
   suddenly be done with the power of AI, particularly gen-AI. Whereas in the
   past you might attempt to create heuristic algorithms that sort of worked
   half the time, today you can use gen-AI, and it works great most of the time.
   You just have to figure out how to get data into the system and pay for GPUs.

These options are not mutually exclusive and in my opinion are all worth
exploring. Once you have some sort of system for defining rules, the next
question is how do you make them accessible to users. A web extension is the
obvious answer, but how should it be designed so that users can easily
understand and customize rules to their preference? That will have to wait for
my next blog post.

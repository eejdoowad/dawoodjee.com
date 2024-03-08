---
title: Design of this Website
description: How and why I built this website
created: 2024-02-20
updated: 2024-03-07
---

For a while now, I’ve wanted to blog about topics I think are interesting or
might be useful to others. This post explains why I needed a website and how I
built it.

## Why not Social Media or Hosted CMSs

Ownership is important to me because I want to control how my content is used
and communicated. I don’t want my content presented alongside ads, cookie
banners, subscription dialogs, or algorithmic feeds optimized for engagement.
I’m fortunate enough to be able to offer my content free of charge or
encumbrances and hopefully it’s worth that price. This purism precludes using
social media platforms like Medium, Substack, or Dev Community.

This left me with the choice of either a hosted CMS like Wordpress or the tried,
old method of a custom website. Unfortunately, the easy hosted option isn’t for
me since I prefer managing content in markdown files that can be opened with a
local text editor, version-controlled with Git, and understood by many useful
tools. The hosted option would also likely involve battling an unfamiliar
monolith to achieve my preferred customizations. Fortunately, as a professional
software dude, I know how to build a website.

## The Static Website Tech Stack

Maintenance is the bane of my existence, so servers that might go down and
services that require an up-to-date credit card are out of the question. Luckily
GitHub Pages exists, and it offers free static website hosting. It just means my
website won’t support dynamic content, which I don’t want anyways because for
blogs, dynamic content usually means social features like commenting, liking,
and sharing. I think social features, which are usually designed to promote
engagement and distribution, are almost always anti-features, since they
distract from the main message and consume users’ limited attention.

Knowing I wanted a static website, the next step was to decide on a static
website builder. Because TypeScript is my most productive language and I hate
wasting time on setup and tooling, I decided to use [Deno](https://deno.com), a
batteries-included TypeScript runtime. I Googled “deno ssg,” found
[Lume](https://lume.land/), and never looked back because _it just worked_.

Lume is just another static site generator. Raw content files go in, beautiful
(or, if we’re being honest, usually ugly) website comes out. In my case, I
wanted to use markdown to write blog posts and JSX to define its presentation.
Markdown is simple, reduces the friction of writing and editing rich(ish) text
documents, and is well supported by editors and tooling. JSX is simple,
powerful, and saves me from having to learn bespoke templating languages of
which Lume has its own. Lume natively supports Markdown and setting up the
first-party JSX plugin took me 5 minutes.

Setting up hosting and DNS to actually get the static websites deployed at
https://dawoodjee.com was straightforward. I use Namecheap for domain
registration since it’s done the job well for me for years, Cloudflare for easy
DNS configuration and fast nameservers, and Lume’s stock template for deploying
to GitHub Pages with GitHub Actions.

I could have reduced complexity and save an hour by deploying to a github.io
subdomain, but using my own domain helps me retain control of my content. I can
shift the underlying infrastructure, perhaps by switching from Github pages to
GitLab Pages, without breaking the user-facing API: URLs.

## Designing the Website

With the basic tech stack decided, the next step was to design the website. I
followed this principle: less _is_ more because extraneous content distracts
from the core message. There would be no about page, no contacts page, no
hamburgers or kabobs; just a home page with basic information and links to blog
posts.

Branding helps with recognition, so I added a simple tuxedo cat avatar to the
top of the page that also serves as a link to the home page. I created a footer
with a few useful tools: a search box (that directs queries to a site-scoped
Google search), a link to the page’s underlying file in GitHub in case I want to
make a quick edit or someone identifies a typo, and feed links for eccentrics
like me.

Blog posts follow this basic structure: first the title, then basic metadata,
then tags, and finally the content. I call it “basic metadata” because I think
basically everything on the internet should have it. It peeves me when an
article is not accompanied by its author or publish date. Why should I trust
whatever is written if no accountable name is attached? How do you know whether
the information is still relevant or hopelessly outdated? I considered adding
time-to-read estimates, but decided not to, since it’s unclear to me if they are
actually useful. Email me if you know a compelling reason to include them.

I have mixed feelings about tags because it’s hard to decide on and easy to miss
appropriate tags. I chose to include them for now because they help readers
quickly identify topics that _aren’t_ of interest. I look forward to a future in
which tags are AI-generated based on the content of blog posts. The future is
probably the present, but Lume doesn’t have a first-party plugin.

## Retrospective

Well, dawoodjee.com is online and I’m on the tail end of my first blog post. Did
I succeed? In terms of building a blog in which I retain full control, Yes. In
terms of building a compelling blogging experience, Yes. In terms of building a
low maintenance website… I’m optimistic but uncertain. I’ll check back again
later, perhaps in a year, to see if I’m still happy. Hopefully nothing breaks
and Dependabot security alerts skip my inbox.

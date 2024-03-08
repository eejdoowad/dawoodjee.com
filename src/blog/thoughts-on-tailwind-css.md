---
title: Thoughts on Tailwind CSS
draft: true
created: 2024-02-20
tags:
  - ux
  - css
  - tailwind
---

My first impression of Tailwind CSS was confusion about why people would want to
learn another language for styling web content. You still have to learn CSS to
understand the styles Tailwind compiles down to, and sometimes you still
occasionally need fine control only available with CSS. So why bother adding yet
another misfit screwdriver to their finite developer toolbox?

I'm still not entirely convinced by Tailwind's salespitch, but with a little bit
of thinking, I now see how it can be a useful tool. This is my takeaway:

1. The class-based styling language enforces constraints on the styles that can
   be written, which promotes consistency in both presentation and code. Users
   are happy because different parts of the UI blend coherently together since
   they're built from the same underlying building blocks. Developers are happy
   because they don't have to deal with other people's (or their own) bespoke,
   crappy CSS. It's possible to intuit the affect a tailwind class has on
   appearance, and with enough experience, it's possible to intuit which
   tailwind class gives an element a given aspect of its appearance.

   I think this might be the biggest strenght of Tailwind, particularly when
   working on large projects and in teams with shared and changing ownership.

   CSS libraries are an alternative way to enforce consistency.

   Component libraries are an alternative way to enforce consistency. A problem
   with component libraries is their opinions on features, customization, and
   APIs can conflict with your own, they can be heavyweight in terms of
   integration cost and performance, and they often require the use of a
   specific framework.

2. Tailwind solves naming, which is one of the two hard problems in computer
   science. Its solution is to define all the names itself so that you don't
   have to invent your own names. Instead, you solve the easier problem of
   finding the right name, and given Tailwind's consistent, semantic naming,
   this is intuitive and quick with some experience.

   Personally,

3. Tailwind solves CSS selectivity, so users don't have architect selectors and
   rules around ensuring elements have the right style in all contexts.

4. There is a lot less to learn.

Since I have opinions on Tailwind, what tech stacks have I used, and how do they
compare?

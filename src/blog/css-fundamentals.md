---
title: CSS Fundamentals
description: Foundations professionals should know
draft: true
created: 2024-03-14
---

This opinionated post covers the fundamentals of CSS needed to understand how it
works and be more productive.

## Background Knowledge

A simplistic view of the visual components of a web page:

1. A tree of HTML elements
2. A set of CSS rules that describe the layout and appearance of HTML elements

The browser processes _1_ and _2_ to render the pixels that form the UI. It does
this in a pipeline of steps, which you can read more about here.

This post focuses on the foundations that impact layout... and more (TBD, TODO).

## Render pipeline

Intersting details

- The UI layout is a tree of scrolling panes which are positioned relative to
  other panes (often the parent pane)
- Scrolling is fast because the entire dom tree is always rendered, including
  parts that aren't visible, with some exceptions...
- Series of tree transformations

## Box Model

- Content box, padding box, border box, margin box
- Box sizing
- Margin collapsing

## Units

- px, vw, vh, %, em, rem,

## Layout Algorithms

position: relative, absolute, fixed, sticky

z-index

Display type

- Display type encompasses both
  - Outer display type - determines if an element should be laid out within its
    parent as inline or block. Only used if the parent's inner display type is
    inline or block
  - Inner display type - determines how an elements's children should be laid
    out
- Specified as `display: (<display-outside>-)?<display-inside>`
- Outer display type is only used in normal flow (when parent uses
  display:inline or display:flex)
- display: inline, block, inline-block, flex, inline-flex, grid, inline-grid
  properties associated with each display (create a table, e.g. {inline, float})

Position types

- static (default position in normal flow)
- relative (to static position and include margins but not margin collapsing)
- absolute (relative to the padding box of the nearest non-statically-positioned
  ancestor)
- fixed (relative to viewport)

Stacking precedence

- larger z-index > smaller z-index
- positioned > non-positioned
- later source position > earlier source position

### Interplay with element tree

- rendering order
- z-index

## How scrolling works

- The page scrolling element
- Implications of scroll position initialization/restoration (possibly with
  #fragment)

### Why things are the way they are

- Classic problem of centering without flex
- width: 100% in absolute positioned elements

## Text Processing

TODO

## Selectors

- style and class
- Selection rules and operators

## Inheritance

TODO

### Problems

- Conflicting rules and popular solutions/workarounds
- Design systems

### Advanced stuff

- Pseudo elements
- Pseudo selectors
- Media queries

## Comparison to other rendering systems

- video games, immediate mode
- All elements rendered, all the time
- Performance implications

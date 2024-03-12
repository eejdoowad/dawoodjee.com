---
title: Terminals suck and what you can do about it
description: How they suck and coping mechanisms
draft: true
created: 2024-03-11
---

- Terminals, shells, terminal emulators, ttys, only eccentrics know the
  difference
- What it means to most people: a REPL with an arcane scripting language hackers
  use to run programs

## The problems

- Terrible UI by default
  - No syntax highlighting
  - No error detection
  - No hints or completions
  - No universal configuration file
  - Configuration is the execution of a program (and is therefore hard to
    visualize, edit, and transform)
  - No universal UI
  - Line based IO conventions
- Lots of assumed knowledge with no hints
  - System knowledge
    - Environment variables
    - Commandline arguments
    - Pipes
    - Stdin, stdout, stderr
    - Return codes
    - Signals
    - Processes
  - Files
    - OS directory tree
    - Root and home directory
    - Absolute and relative paths
    - File permissions
    - Hidden files
    - Symbolic links
- Productive use requires knowledge of common commands
  - Basic: ls, ll, cd, pwd, touch, mkdir, rm, cp, echo, cat, history, man,
    which, nano
  - Advanced: chmod, curl, wget, head, tail, kill, ps, grep, find, sed, awk,
    xargs, git, and anything else
- Shell scripting languages are terrible
  - Many incompatible variants
  - Objectively worse than non-shell languages
    - Large and immemorable syntax you have to constantly relearn
    - Brittle syntax makes it hard to write working programs and easy to
      unknowingly write broken programs
    - Unintuitive variable expansions
    - Unintuitive error handling, set -e, set -x???
    - No data types, let alone complex data types
- Commands suck
  - Every command invents bespoke IO interfaces
  - Interfaces are untyped and therefore unanalyzable; it's all text in, text
    out, perhaps interperted as sequences of lines by convention, perhaps not
  - Learning one command does not help you infer anything about any other
    command
  - Different systems have different commands available
  - Different systems have inconsistent implementations of the same command
  - Different systems have different tools for installing new commands
  - Some commands are functions, some commands are programs, sometimes it
    matters

## Coping Mechanisms

Okay, terminals suck. So what can I do about it?

- Learn things that you need frequently and that don't change
  - Basic commands
  - System concepts
  - File and directory concepts
- Don't waste your time trying to learn things you won't remember
  - Advanced commands
  - Infrequently used arguments of simple commands
  - Shell scripting languages
- Insead use better tools
  - Use a "real" programming language, if it's an option
  - Use GUI tools that run commands for you
  - Use AI to write shell commands you don't know how to write
  - Ask AI to explain shell commands you don't understand

If you're crazy you can

- Commit your life to learning and remembering endless shell minutia
- Invent a better shell scripting language and fail at getting the world to
  adopt it
- Build new commands that are more consistent alternaties to existing commands
  and fail at getting the world to adopt them

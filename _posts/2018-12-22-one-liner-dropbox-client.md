---
layout: post
title:  "My one-liner Linux Dropbox client"
date:   2018-12-22
comments: true
categories: linux
---

In this blog post, I want to discuss one of my recent attempts to create a
simple one-liner Linux Dropbox client with only **free** components, including
[rclone](https://rclone.org/), [entr](http://eradman.com/entrproject/), and
[systemd](https://www.freedesktop.org/wiki/Software/systemd/).

# Context

Recently, the proprietary Dropbox Linux client dropped support for all Linux
file systems except *unencrypted ext4*. "Unfortunately", my home directory is
encrypted. I run Ubuntu Bionic on my 2-year-old Thinkpad t460s.

In early December, the proprietary Dropbox Linux client I have been using for
the past year stopped working. It logged me out, and prompted me to choose a
sync folder on a "supported file system".

# How I use Dropbox

I live in Emacs, and I am a heavy [Org mode](https://orgmode.org/) user. My use
case of Dropbox is basically "**continuously** backing up my org files". And I
only write Org notes on **one** computer.

If you know a bit data infrastructure, my use case of Dropbox is literally
"asynchronous single-master replication for fault tolerance purposes". All
writes go through my Thinkpad, the master. The remote Dropbox folder is just a
read-only follower replica that I occasionally "issue read-only queries" to, or
used as a backup to construct a new master when the current master fails or gets
stolen.

Sorry for being a bit off-topic. Nevertheless, this replication setup saved my
life multiple times. I still remember that the motherboard on my Thinkpad was
fried during an exam season. Since I replicated my notes to Dropbox, I was able
to view them on my mom's Macbook. Thank you mom!

# My failed attempts

I was busy lately until today, so I didn't invest much efforts in fixing my
"continuous syncing setup" when it was broken in early December. However, I did
try to poke around a bit. I discovered a few other remote file system clients
for Linux, including [overGrive](https://www.thefanclub.co.za/overgrive) and
[insync](https://www.insynchq.com/). However, I found them to be way too
feature-rich, and not **well-suited for my use case**.

For example, these clients are modelled as *mounting a remote file system onto
your file system*. They try really hard to abstract the remote file systems away
by making them look and feel like local file systems. They typically implement
two-way syncing, automatically mapping remote file types to Linux file types,
etc.

I don't need this level of abstraction and I think it even makes things more
complicated. Not to mention that most of these "feature-rich" clients are also
proprietary.

# rclone!

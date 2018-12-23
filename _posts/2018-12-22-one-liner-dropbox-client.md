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

I eventually ran into [rclone](https://rclone.org/) and realized that it is
exactly what I am looking for. `rclone` is like `rsync` but for "cloud storage".

It not only takes care of integrity check, synchronization efficiency, etc., but also
provides [a simple CRUD
interface](https://github.com/ncw/rclone/blob/6b1f915ebccdf232cb128540ba67098b754282d6/fs/fs.go#L210-L244)
to interact with popular cloud storage service including Amazon S3, Google
Drive, and Dropbox.

[Here is the setup guide for Dropbox](https://rclone.org/dropbox/).

The following command will make sure the remote directory `org` is identical
with the local directory `/home/lpan/org`

```
ORG_DIR=/home/lpan/org
REMOTE=dropbox

rclone sync $ORG_DIR $REMOTE:org
```

# entr

[entr](http://eradman.com/entrproject/) is a command runner that uses the
[inotify](http://man.he.net/?section=all&topic=inotify) API. It basically allows
you to run a command based on file changes without *polling* the file system.

From their official documentation, one of the common usages is to *rebuild the
project when any of the source files change*.

```
ag -l | entr make
```

# The one-liner script

Now we learned about `rclone` and `entr`. The final script turned out to be very
simple. To remind you about my use case of Dropbox, all I want is to
continuously replicate my local Org file changes to Dropbox. Therefore, we just
need to use `entr` to watch the files we want to replicate, and then use
`rclone` to "sync" them to the remote storage.

The final script looks like something like this:

```
ORG_DIR=/home/lpan/org
REMOTE=dropbox

find $ORG_DIR | entr -r rclone sync -v $ORG_DIR $REMOTE:org
```

# Make the script into a Daemon

A [Daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) is "just a computer
program that runs as a background process". We make this script into a
"background process" because we want it to **continuously** sync local file
changes to the remote file system in the background.

[systemd](https://www.freedesktop.org/wiki/Software/systemd/) provides an
interface for us to manage daemon processes.

I created a *Dropbox Service* in `~/.config/systemd/user/dropbox.service`.

```
[Unit]
Description=Dropbox Daemon

[Service]
ExecStart=/home/lpan/sync_dropbox.sh
Restart=always

[Install]
WantedBy=default.target
```

Then, I started by running

```
# reload the service file
systemctl --user daemon-reload

# start the daemon
systemctl --user start dropbox.service

# start the daemon on login
systemctl --user enable dropbox.service

# inspect the status of the daemon
systemctl --user status dropbox.service
```

# Conclusion

In this post, I discussed how I apply the UNIX philosophy and use a set of free
and open-source tools to replace the proprietary & deprecated Dropbox client. We
talked about `rclone` and `entr`. I also showed you how I make this process a
Daemon and manage it using `systemd`.

Thanks so much for reading. I really hope you enjoy this post. Got a better way
to do a similar job, or know how to extend the script for another use case? Let
me know in the comment section below!

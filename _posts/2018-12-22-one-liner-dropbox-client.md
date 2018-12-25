---
layout: post
title:  "My one-liner Linux Dropbox client"
date:   2018-12-22
comments: true
categories: linux
---

In this blog post, I want to discuss one of my recent attempts to create a
simple one-liner Linux Dropbox client using only free and open-source
components, including [rclone](https://rclone.org/),
[entr](http://eradman.com/entrproject/), and
[systemd](https://www.freedesktop.org/wiki/Software/systemd/).

# Context

Recently, the proprietary Dropbox Linux client dropped support for all Linux
file systems except *unencrypted ext4*. And, my home directory is
"unfortunately" encrypted.

In early December, the proprietary Dropbox Linux client I have been using
stopped working. It logged me out, and prompted me to choose a different sync
folder on a "supported file system".

By the way, I run Ubuntu bionic on a two-year-old Thinkpad t460s.

# How I use Dropbox

I am a heavy [Org mode](https://orgmode.org/) user. I take notes in plain text,
and my use case of Dropbox is simply "continuously backing up my notes while I
type".

If you are also into data infrastructure, my use case is very similar to
"asynchronous single-master replication". All writes go through my Thinkpad, the
master. The remote Dropbox folder is just a read-only follower that I
occasionally "issue read-only queries" to, or used as a backup to construct a
new master when the current master fails or gets stolen.

Nevertheless, this replication setup has saved my life multiple times. I still
remember, very vividly, that my Thinkpad couldn't boot during the exam season at
the end of my sophomore year. Since I continuously replicated all my notes to
Dropbox, I didn't lose any data and I was able to view my latest notes on my
mom's Macbook. Thanks mom!

# My failed attempts

When the Dropbox client stopped working, my main focus was to find another
similarly feature-rich remote storage client for Linux. I also wouldn't mind
migrating to another storage back-end, such as Google Drive or AWS S3. Some of
the other options I considered include
[overGrive](https://www.thefanclub.co.za/overgrive) and
[insync](https://www.insynchq.com/).

However, I concluded that these solutions are way too feature-rich, and not
**well-suited for my use case**.

For example, these clients are modelled as *mounting a remote file system onto
your file system*. They try really hard to abstract the remote file systems away
by making them look and feel like local file systems. They typically implement
two-way syncing, automatically mapping remote file types to Linux file types,
etc.

I don't need this level of abstraction. I just need something simple that allows
me to back up my notes to the cloud continuously while I type. In addition, the
abstraction also makes it harder to set up and debug. Not to mention that most
of these "feature-rich" clients are proprietary.

# rclone

I ran into [rclone](https://rclone.org/) and realized that it is exactly what I
was looking for. `rclone` is simple but powerful. It is very similar to the
`rsync` tool, but for "cloud storage".

For example, it not only takes care of fault tolerance (integrity checks),
efficient synchronization algorithms, etc., but also provides [a simple CRUD
interface](https://github.com/ncw/rclone/blob/6b1f915ebccdf232cb128540ba67098b754282d6/fs/fs.go#L210-L244)
to interact with popular cloud storage services, including Amazon S3, Google
Drive, and [Dropbox](https://rclone.org/dropbox/).

The following command will make the remote directory `org` identical with the
local directory `/home/lpan/org`

```
ORG_DIR=/home/lpan/org
REMOTE=dropbox

rclone sync $ORG_DIR $REMOTE:org
```

# entr

[entr](http://eradman.com/entrproject/) is a command runner that leverages the
[inotify](http://man.he.net/?section=all&topic=inotify) API. It basically allows
you to run a command triggered by file changes, without *polling* the file
system.

One of its common usages is to *rebuild the project when any of the source file
changes*.

`entr` takes a list of absolute paths from `stdin`, and then it will execute a
command, passed in as an `ARG`, when any of the watched file changes.

```
WORKDIR=/path/to/myproject
find $WORKDIR | grep "\.cpp$" | entr make
```

# The one-liner script

Now we learned about `rclone` and `entr`. The final script turned out to be very
simple. To remind you about my use case of Dropbox, all I want to do is to
continuously replicate my local Org file changes to Dropbox. Therefore, we just
need to use `entr` to watch the files that we want to replicate, and use
`rclone` to "sync" them to the remote storage.

The final script (`/home/lpan/sync_dropbox.sh`) looks like the following:

```
#!/bin/bash

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

Then, you can manage the daemon with the following commands

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

I want to remind you that the **key idea** of this post is _simplicity_. We want
to solve our simple problems with simple solutions. My use case of Dropbox is
very simple. And this is why one simple line of shell script would be a better
solution than using a feature-rich, and possibly proprietary remote storage
client.

Thanks so much for reading! I really hope you enjoy this post. Got a better way
to do the same job, or know how to extend the script for another use case? Let
me know in the comment section below!

**Edit 2018-12-24:** This article has been discussed on [Hacker
News](https://news.ycombinator.com/item?id=18750797) and
[r/linux](https://www.reddit.com/r/linux/comments/a92m1u/my_oneliner_linux_dropbox_client/).

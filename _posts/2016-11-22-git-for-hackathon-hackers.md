---
layout: post
title:  "Git for Hackathon Hackers"
date:   2016-11-22
comments: true
categories: programming
---

You know how to `git add`, `git commit`, `git push` and `git pull`; You go to a
ton of hackathons; You love experimenting new technologies and building cool
shits in 36 hours. All is good, you are awesome.

You also love working with people. You know the importance of version control so
you ask all your teammates to use git and github. You love git, your teammates
love you.

Sometimes one of your newbie teammates pushes some bad code to the master branch
and breaks your app. Your whole team has to wait half an hour for you to
`stackoverflow` how to revert a git commit.

Sometimes you and someone else accidentally work on the same feature. She
commits her changes one second before you do, so you have to spend 30 minutes to
learn vimdiff, 20 minutes to solve the merge conflict and 5 minutes to delete
vim then install atom.

Because of the time wasted on git, your team can't finish your epic project so
all of you cry together on the way home.

Anyway, most people know how to `add`, `commit` and `push` with `git` but only a
few know how to play with branches and use `Pull Requests (PR)`

As for this blog article, I will discuss about why do you want to branch out
your hackathon projects and how to do it.

Here are a few advantages of branching out your project:

* **Noob proof** => reject shitty code committed by your newbie teammates (it's
  a great opportunity for them to learn too)
* **Easier project management** => It is easy to add a description to your
  changes.
* **Less bugs** => Test your changes on your local branch. Merge to master only
  if nothing breaks.
* **Less merge conflicts** => It's less likely to have merge conflicts.
* And many more!

Since this post is written for hackathon hackers, I will skip the
`how-does-it-work` part and only focus on the `how-to-make-it-work` part.

### Procedures

* Create your branch & make a Pull Request

```bash
git fetch # Get the latest commits/branches from remote
git branch # check if you are on master branch
git status # check if your repository is clean and master is up-to-date

# if master not up-to-date do
git merge origin/master master # Merge origin/master into master
# Note we are not using rebase here because this post is for hackathon hackers

git checkout -b my-branch # Create a branch called my-branch and switch to it
# Now make your changes and do the add/commit thing
# ...
# After you are done
git push origin HEAD # Push your branch to remote
# Then, visit the repo on github and create a pull request
# https://help.github.com/articles/creating-a-pull-request/
```

* Update your local branch

```bash
# You want your branch to be up-to-date
# When your teammates push some changes to the master branch after you create
# your branch, git will tell you that your branch is a few commits behind the
# origin/master.
git fetch # fetch the latest commits from remote
git status # Make sure your repo is clean

# The commands in this block are optional
git checkout master # switch to master branch just for fun
git status # now git will tell you if your master is behind origin/master
git checkout my-branch # let's switch back to our branch
# End of optional commands

git merge origin/master my-branch # merge the newest master to your branch
```

That is it! Productivity boosted by 21%!

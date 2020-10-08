+++
title = "👋 Hello, Hugo!"
author = "Patrick Gatewood"
date = "2020-10-04"
categories = ["blog-meta"]
tags = ["hugo", "staticman"]
[[images]]
  src = "images/2020/hugo-logo.jpg"
  alt = "Hugo Logo"
+++

Welcome! You've found my first blog post. [Hugo](https://gohugo.io) is an awesome open-source static site generator with a super active community.

I've chosen Hugo as my blog framework so I can learn more about static site generators and post some write-ups of what I'm up to without needing to manually create my site or worry about a CMS. As with most blogs, I expect everything on this site to be content-driven, so Hugo is a great fit.

Right off the bat I can see how flexible this tool is as my site hot-reloads while the Hugo server observes changes in my Markdown. There are a _lot_ of customization options, but I'm going to keep it slim until I have my site hosted and building/deploying automatically. I'm excited to look back on this hello world post in the future and see how much I've learned since the time of writing.

What follows will be anything interesting I learned while setting up this blog.

## Dynamic Content on a Static Site
To be honest, I didn't think about hosting any dynamic content on this statically-generated site until looking over the [Hugo Imperfect Slim](https://github.com/pacollins/hugo-future-imperfect-slim) documentation. This theme ships with an almost-complete setup of [Staticman](https://github.com/pacollins/hugo-future-imperfect-slim/wiki/staticman.yml#official), an engine that transforms user-generated content into data that is committed into source control. From there, I can make sure my site observes my repository and automatically rebuilds when changes are detected in the main branch.

The theme ships with a good amount of [Staticman](https://github.com/pacollins/hugo-future-imperfect-slim/wiki/staticman.yml#official) boilerplate already abstracted away, but not in a way that locks me into this theme if I ever want to change the look and feel of my blog. I'll definitely be setting it up.

I'm looking for two outcomes from setting up Staticman: learning how to automatically re-deploy my site when changes are pushed to the main branch of GitHub, and creating a feedback channel so that I can interact with the readers of my blog.

### Setting up Staticman
Staticman works by hosting a REST API that my static website will consume in order to serve dynamic content. Here's how it works:
1. Submitting a comment on my blog sends a `POST` request with form data to Staticman.
2. Staticman ingests the form data and pushes a commit to my website's repo. If using the `moderate comments via PR` option, the bot opens a PR; otherwise, it will commit to the repositroy's main branch.
3. A CI/CD pipeline triggers, building and deploying the new static site complete with the new comment.
4. Staticman automatically deletes its PR branch (if using the `moderate comments via PR` option) using a webhook.

### Linking External Posts
Since I had some existing blog posts, I wanted to include them here so I can have a repository of all the content I've written. I'm glad I chose a framework with an active community, because someone had already done this! I was able to link to my existing blog posts in just a few minutes following [Harry Cresswell's guide](https://harrycresswell.com/articles/hugo-external-articles/). Neat!

I also tried my hand at extending some of the Hugo templates so I could indicate that an article was published by an external source. That was a good way to learn some Go, and may inspire another blog post in the future...

### That's it for now!
I've learned a ton just deploying this site, and I've gotten some inspiration for more articles to come! See ya soon ✌️

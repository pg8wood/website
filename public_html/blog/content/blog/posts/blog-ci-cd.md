+++
title = "CI/CD - Continuous Delivery with GitHub Actions"
description = "Deploy your Hugo blog automatically and publish new posts with ease."
author = "Patrick Gatewood"
date = "2020-10-14"
categories = ["blog-meta", "CI/CD"]
tags = ["hugo", "github", "github actions", "devops"]
[[images]]
  src = "images/2020/github-actions.png"
  alt = "GitHub Actions Logo"
+++

CI/CD is a crucial skill for any engineer working in an enterprise setting. Clients come back to engineers who can reliably deliver their apps quickly, frequently, and painlessly.
Whether you're still looking up [the definition of CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd) or are a seasoned DevOps engineer,
GitHub Actions is an easy way to automate publishing new content on your Hugo blog.

## Prerequisites
- Your blog is already hosted. I highly recommend [Caddy](https://caddyserver.com).
- Your hosted blog lives in a git repository and you have permissions to pull changes from the remote repository.
- Hugo is installed on your server and is in your `PATH`.

## Building the Workflow
Workflows are automated processes that run on GitHub's virtual machines in response to repository events.
Luckily for us, building and deploying a Hugo blog is one of the simplest workflows one can create.

Create a file called `.github/workflows/deploy.yml` in the root of your repository. This file will tell GitHub what jobs to run and when to run them.
Below is the [workflow](https://github.com/pg8wood/website/blob/master/.github/workflows/deploy.yml) that deploys this blog.

**deploy.yml**
```yaml
name: Build & Deploy Hugo Blog

on:
  push:
    branches:
      - main

jobs:
  build:
    name: SSH to web host, build and deploy site
    runs-on: ubuntu-latest
    steps:
    - name: Run Hugo
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        port: ${{ secrets.PORT }}
        script_stop: true # stop the script immediately if any commands fail
        script: |
          cd ${{ secrets.HUGO_DIR }}
          git pull
          hugo
```

This workflow does a few things:
1. It will run every time a commit is pushed to the `main` branch.
2. It contains one job called `build`.
3. The `build` job contains one step, `Run Hugo` which uses a GitHub Action called [ssh-action](https://github.com/appleboy/ssh-action) to SSH to the server hosting the blog.
4. Once connected, the `ssh-action` step executes the build script on the web server which pulls the changes from GitHub and runs `hugo` to rebuild the blog.
5. It keeps data like the `${{ secrets.USERNAME }}` safe by [encrypting](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) my sensitive info and passing it as environment variables.

### Set up Environment Variables
Go to your repository > Settings > Secrets and add your environment variables:
- `secrets.HOST` - your machine's hostname.
- `secrets.USERNAME` - the username with which to build your Blog.
- `secrets.KEY` - that user's SSH private key.
- `secrets.PORT` - your machine's SSH port. If you don't know this, it's probably [22](https://www.ssh.com/ssh/port0).
- `secrets.HUGO_DIR` - the directory in which your blog lives.

### Final steps
Make sure `deploy.yml` is committed and pushed to the `main` branch, or else GitHub won't start running your workflow just yet.

That's it! With just a few lines of YAML, GitHub will build and deploy your blog every time you push to the main branch.
If any problems occur on the remote machine, the `ssh-action` reports a failure back to GitHub, and the build in the GitHub Actions tab is marked as failed.

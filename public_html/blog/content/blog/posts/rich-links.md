+++
title = "Rich Links with Hugo"
description = "Help your site get discovered and look great when shared on social media."
categories = ["blog-meta"]
tags = ["seo", "search engine optimization", "rich links", "rich link previews"]
date = 2020-10-27
draft = false
[[images]]
  src = "images/2020/rich-links.jpg"
  alt = "Rich Links"
+++

If you've never thought about how links to your site look when shared, they probably look like this:

<div align=center>
    <img width=45% src="/images/2020/boring-link.png" />
</div>

Luckily, transforming your links into enticing, tappable calls to action is just a matter of adding a few `meta` tags to your pages. And if you're using Hugo or another site templating system, you can set it up once and forget it.

By the end of this tutorial, your links will look something like this:

<div class="inline-figures">
  <figure>
    <img src="/images/2020/imessage-rich-link.png" alt="my img"/>
    <figcaption>iMessage</figcaption>
  </figure>

  <figure>
    <img src="/images/2020/slack-rich-link.jpeg" alt="my img"/>
    <figcaption>Slack</figcaption>
  </figure>

  <figure>
    <img src="/images/2020/messenger-rich-link.png" alt="my img"/>
    <figcaption>Messenger</figcaption>
  </figure>
</div>

<br />

# Meta Template
First check if your Hugo theme already has a built-in meta partial layout.
In the themes I researched, it typically resides in `layouts/partials/meta.html`.
If that doesn't exist in your theme, you'll want to create a new partial layout by
creating `meta.html` and telling Hugo to include it in your [base template](https://gohugo.io/templates/base/).
```html
<head>
  {{ partial "<path>/meta.html" . }}
  <!-- The rest of your stuff -->
</head>
```

This way, we ensure the metadata is automatically included in every page on your site.
If you're unfamiliar with partial Hugo templates, check out the
[partial template guide](https://gohugo.io/templates/partials/#use-partials-in-your-templates).

# Meta Tags
Here's where you'll expose the data needed to create rich link previews. Typically,
the most important properties are your page title and an image, but there's plenty of
options available.

Most sites use metadata tags defined in the [Open Graph protocol](https://ogp.me)
to normalize the process used to make your site's links look good everywhere on
the Internet.

The following tags will populate rich links with the [front matter](https://gohugo.io/content-management/front-matter/) for your site's articles, and data from your
site's [config file](https://gohugo.io/getting-started/configuration/) for all
other pages.

Note: some of the Go variables assume your site is including standard metadata
in your article front matter and site configuration. You may need to adjust the
variable names to match your theme's implementation.

<br />

## Title
This property is often inferred automatically, but it usually defaults to the page title.
Some sites like Twitter use [unique metadata types](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary) to populate their UI.

```html
<meta name="title" property=”og:title” content="{{ .Title }}{{ if ne .Title .Site.Title }} | {{ .Site.Title }}{{ end }}"/>
<meta name="twitter:title" content="{{ .Title }}{{ if ne .Title .Site.Title }} | {{ .Site.Title }}{{ end }}" />
```

<br />

## Description
Typically a short, 1-2 sentence description of your site. This property displayed as
frequently in my experience, but I always create one just in case. Again, Twitter
uses their special types for some reason.

```html
<meta name="description" content="{{ .Description }}{{ if not .Description }}{{ .Site.Params.meta.Description  }}{{ end }}"/>
<meta property="og:description" content="{{ .Description }}{{ if not .Description }}{{ .Site.Params.meta.Description  }}{{ end }}" />
<meta name="twitter:description" content="{{ .Description }}{{ if not .Description }}{{ .Site.Params.meta.Description  }}{{ end }}" />
```

<br />

## Image
Shows an image in your rich link. This implementation grabs the image from your article's
front matter if it exists. Otherwise it falls back to a default image.

My blog defines images by including the following structure in the article's front matter:
```markdown
[[images]]
  src = "<image source>"
  alt = "<alt text>"
```

You may need to adjust the Go variables in the below template to match your theme's
front matter image structure.

```html
{{ if .Params.images }}
  {{ range first 1 .Params.images }}
    {{ $src := .src | absURL }}
    <meta property="og:image" content="{{ $src }}" />
    <meta itemprop="image" content="{{ $src }}" />
    <meta name="twitter:image" content="{{ $src }}" />
    <meta name="twitter:image:src" content="{{ $src }}" />
  {{ end }}
{{ else }}
  <!--
  If no images are in this page's front matter or it isn't an article,
  you'll need to choose a default image. Personally, I use my favicon.
  -->
{{ end }}
```

<br />

## Done
That's it! With just a few meta tags, you've transformed your links from standard
URLs to rich, eye-catching content.

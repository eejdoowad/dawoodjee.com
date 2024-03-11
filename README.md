# Dawoodjee.com

Built with https://lume.land

```sh
# Run local dev server
deno task serve

# Generate prod files into _site/
deno task build

# Upgrade Lume version used in project
deno task lume upgrade
```

## Images

Firefox Screenshots

1. Open developer tools
2. Open responsive design mode
3. Change resolution to 1280 x 720
4. Type `cmd + shift + S` to take a screenshot
5. Download it

Image Processing

1. Convert to `.avif` using https://squoosh.app
2. Save to `/static/img/{blog-post-path}/{image-name}.avif`

Referencing in Markdown

```md
Expands beyond text width by default

![Image description](/img/example-post/example-image.avif`)

Add #small suffix to not exceed text width

![Image description](/img/example-post/example-image.avif#small`)
```

## Videos

Recording Screencasts

1. Type `cmd + shift + 5` to open Screenshots
2. Create a recording

Video Processing

1. Import the `.mov` into iMovie
2. Trim the video
3. Export to `.mp4` using `File -> Share -> File`
4. Convert `.mp4` to `.webm` using https://www.freeconvert.com/mp4-to-webm
5. Save to `/static/img/{blog-post-path}/{video-name}.webm`

# elouan-salaun.github.io

Personal data science portfolio. Plain HTML/CSS/JS — no build step, no dependencies to
install. GitHub Pages serves it straight from `main`.

```
index.html          all the content
assets/style.css    styling and the light/dark palette
assets/main.js      expandable projects, theme toggle, equation rendering
assets/img/         figures for projects
```

## Editing

Everything you write lives in `index.html`, in clearly marked sections:
`ABOUT`, `PROJECTS`, `EDUCATION`, `SKILLS`, `CONTACT`.

### Adding a project

Copy one whole `<article class="project">` block and change four things:

1. `id` on the `<article>` — e.g. `p-myproject`
2. `id` on the `<button>` — `p-myproject-btn`
3. `aria-controls` on the button and `id` on the panel — `p-myproject-panel`
4. `aria-labelledby` on the panel — `p-myproject-btn`

Then write whatever you like inside `.panel-inner`. Each project gets its own URL:
`…/#p-myproject` opens that project directly, so cards are linkable from a CV or an email.

### Images

Drop the file in `assets/img/` and use a figure:

```html
<figure class="fig">
  <img src="assets/img/my-plot.png" alt="What the plot shows.">
  <figcaption>Fig. 1 — Caption.</figcaption>
</figure>
```

### Diagrams

Inline SVG inside a `<figure class="fig">` follows the theme automatically if you use the
helper groups `.d-box` (rectangles), `.d-line` (connectors) and `.d-text` (labels). There is
a worked example in the first project.

### Equations

Rendered by [KaTeX](https://katex.org/docs/supported) loaded from a CDN.

- display: `$$ \tau(x) = \mathbb{E}[Y(1) - Y(0) \mid X = x] $$`
- inline: `\( \gamma = 2 \)`

## Previewing locally

```sh
python3 -m http.server 8000
```

then open <http://localhost:8000>. (Opening `index.html` directly as a `file://` URL also
works, but a server matches what GitHub Pages does.)

## Publishing

Push to `main`. In the repository's *Settings → Pages*, set the source to
*Deploy from a branch* → `main` / `/ (root)`. The site appears at
<https://elouan-salaun.github.io> within a minute or two.

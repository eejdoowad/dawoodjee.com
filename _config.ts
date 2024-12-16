import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import title from "lume_markdown_plugins/title.ts";
import toc from "lume_markdown_plugins/toc.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import sqlLang from "npm:highlight.js/lib/languages/sql";

const site = lume({
  src: "./src",
  location: new URL("https://dawoodjee.com"),
});

site
  .use(jsx())
  .copy("static", ".")
  .use(sitemap(/* Options */))
  .use(title())
  .use(toc())
  .use(codeHighlight({
    languages: {
      sql: sqlLang,
    },
  }));

site.use(feed({
  output: ["/feed.xml", "/feed.json"],
  query: "kind=post",
  sort: "created=desc",
  limit: 1000,
  info: {
    title: "Sufyan rambles",
  },
  items: {
    title: "=title",
    published: "=created",
    updated: "=updated",
  },
}));

export default site;

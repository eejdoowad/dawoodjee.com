import { Node } from "lume_markdown_plugins/toc/mod.ts";

// no-op function to enable syntax highlighting in css block.
const css = (strings: TemplateStringsArray) => strings.raw[0];

/**
 * Layout Rules:
 * - 12px for containment separation
 * - 20px for larger visual separation
 * - Normal content width is min(630px, 100vw)
 * - Elements that benefit from extra space can expand up to 1020px = 630px * golden ratio
 * - Font color: black
 * - Background color: white;
 * - Visually separate background color: #f2f2f2
 */

/* Adapted from https://www.joshwcomeau.com/css/custom-css-reset/ */
const styles = css`

/*! modern-normalize v2.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */
*,::after,::before{box-sizing:border-box}html{font-family:system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';line-height:1.15;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4}body{margin:0}hr{height:0;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}

/* highlight.js theme: stackoverflow-lite | MIT License | https://github.com/StackExchange/Stacks */
pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*! */.hljs{color:#2f3337;background:#f6f6f6}.hljs-subst{color:#2f3337}.hljs-comment{color:#656e77}.hljs-attr,.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-section,.hljs-selector-tag{color:#015692}.hljs-attribute{color:#803378}.hljs-name,.hljs-number,.hljs-quote,.hljs-selector-id,.hljs-template-tag,.hljs-type{color:#b75501}.hljs-selector-class{color:#015692}.hljs-link,.hljs-regexp,.hljs-selector-attr,.hljs-string,.hljs-symbol,.hljs-template-variable,.hljs-variable{color:#54790d}.hljs-meta,.hljs-selector-pseudo{color:#015692}.hljs-built_in,.hljs-literal,.hljs-title{color:#b75501}.hljs-bullet,.hljs-code{color:#535a60}.hljs-meta .hljs-string{color:#54790d}.hljs-deletion{color:#c02d2e}.hljs-addition{color:#2f6f44}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

/* My style resets */
a {text-decoration: none}
input[type="search"]{border-width: 0; width: 100%}
html {line-height: 1.6}

/* Page layout */
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
body > nav {
  padding: 20px 12px;
}
body > main {
  flex-grow: 1;
}
body > footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 12px;
}
body > :is(nav, main, footer) {
  width: min(630px, 100vw);
}

/* Custom elements */
.inline-controls {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 12px;
  margin: 12px 0px;
}
.control {
  display: block;
  background-color: #f2f2f2;
  border-radius: 16px;
  padding: 0 12px;
  line-height: 2rem;
}
.grow {
  flex-grow: 1;
}
.subtitle {
  text-align: center;
  font-style: italic;
}

/* Markdown elements */
main h1 {
  text-align: center;
}
main :is(img, picture, video, canvas, svg) {
  display: block;
  max-width: min(100vw, 1020px);
  margin-left: 50%;
  transform: translateX(-50%);
  border: 1px solid #aaa;
}
@media (max-width: 1020px) {
  main :is(img, picture, video, canvas, svg) {
    border-left: 0px;
    border-right: 0px;
  }
}
main :is(img, picture, video, canvas, svg)[src$="#small"] {
  max-width: min(100vw, 630px) !important;
}
main :is(input, button, textarea, select) {
  font: inherit;
}
main :is(p, h1, h2, h3, h4, h5, h6, details) {
  overflow-wrap: break-word;
  margin: 1.6rem 0;
  padding: 0 12px;
}
main > div > pre {
  width: min(1020px, 100vw);
  display: flex;
  justify-content: center;
  margin-left: 50%;
  transform: translateX(-50%);
}
pre > code {
  display: block;
  overflow: scroll;
  min-width: min(630px, 100vw);
  max-width: 1020px;
  padding: 20px 12px;
}
code {
  background-color: #f2f2f2;
}
table {
  display: block;
  width: min(630px, 100vw);
  overflow: scroll;
  border-collapse: collapse;
  text-align: left;
}
th, td {
  padding: 0 12px;
  border: 1px solid #aaa;
}
.toc li {
  display: inline;
}
details > .toc {
  padding-left: 0;
}
summary {
  text-align: center;
  font-weight: bold;
}
summary:hover {
  cursor: pointer;
}
`;

interface CustomLumeData extends Lume.Data {
  kind: "unkown" | "error" | "home" | "post";
  description?: string;
  created?: Date;
  updated?: Date;
  show_toc?: boolean;
  toc: Node[];
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

function TableOfContents({ title, toc }: { title?: string; toc: Node[] }) {
  const nextSectionIndex = toc.findIndex((node) => node.level === 2);
  const patchedToc: Node[] = [
    {
      text: title ?? "Table of Contents",
      slug: "table-of-contents",
      level: 2,
      url: "#",
      children: toc.slice(0, nextSectionIndex),
    },
    ...toc.slice(nextSectionIndex),
  ];
  return (
    <>
      <details>
        <summary>Table of Contents</summary>
        <TableOfContentsList toc={patchedToc} />
      </details>
    </>
  );
}

function TableOfContentsList({ toc }: { toc: Node[] }) {
  return (
    <ul class="toc">
      {toc.map((node) => <TableOfContentsItem node={node} />)}
    </ul>
  );
}
function TableOfContentsItem({ node }: { node: Node }) {
  return (
    <li>
      <a href={node.url}>{node.text}</a>
      {node.children && <TableOfContentsList toc={node.children} />}
    </li>
  );
}

export default (
  {
    title,
    children,
    page,
    kind,
    created,
    updated,
    description,
    toc,
    show_toc,
  }: CustomLumeData,
) => {
  const path = page.src.entry?.path;
  const repo = "https://github.com/eejdoowad/dawoodjee.com";
  const githubUrl = path && `${repo}/tree/main/src${path}`;
  const createdDateString = created && toDateString(created);
  const updatedDateString = updated && toDateString(updated);
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <style dangerouslySetInnerHTML={{ __html: styles }}></style>
      </head>
      <body>
        <nav class="inline-controls">
          {kind !== "home"
            ? (
              <a class="control" href="/">
                Home
              </a>
            )
            : null}
          <form
            class="grow"
            method="get"
            action="https://www.google.com/search"
          >
            <input
              name="q"
              value="site:dawoodjee.com"
              hidden
            />
            <input
              type="search"
              name="q"
              placeholder="Search"
              class="control"
            />
            <input type="submit" value="Search" hidden />
          </form>
        </nav>
        <main class="content-area">
          {kind === "post"
            ? (
              <>
                <h1>{title}</h1>
                <p class="subtitle">{description}</p>
                <div class="inline-controls">
                  <span class="control">
                    By Sufyan Dawoodjee
                  </span>
                  {created && (
                    <span class="control">
                      Published{" "}
                      <time datetime={createdDateString}>
                        {createdDateString}
                      </time>
                    </span>
                  )}
                  {updated && (
                    <span class="control">
                      Edited{" "}
                      <time datetime={updatedDateString}>
                        {updatedDateString}
                      </time>
                    </span>
                  )}
                </div>
                {show_toc && <TableOfContents title={title} toc={toc} />}
              </>
            )
            : null}
          {children}
        </main>
        <footer class="">
          <div class="inline-controls">
            <a class="control" href={githubUrl}>Edit this page</a>
            <a class="control" href="/feed.xml">RSS</a>
            <a class="control" href="/feed.json">JSON Feed</a>
          </div>
        </footer>
      </body>
    </html>
  );
};

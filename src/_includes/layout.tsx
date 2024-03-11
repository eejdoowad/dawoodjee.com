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
main :is(p, h1, h2, h3, h4, h5, h6) {
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
  background-color: #f2f2f2;
  padding: 20px 12px;
}
`;

interface CustomLumeData extends Lume.Data {
  kind: "unkown" | "error" | "home" | "post";
  description?: string;
  created?: Date;
  updated?: Date;
}

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
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

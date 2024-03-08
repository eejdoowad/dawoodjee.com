// no-op function to enable syntax highlighting in css block.
const css = (strings: TemplateStringsArray) => strings.raw[0];

/* Adapted from https://www.joshwcomeau.com/css/custom-css-reset/ */
const styles = css`
/*! modern-normalize v2.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */
*,::after,::before{box-sizing:border-box}html{font-family:system-ui,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';line-height:1.15;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4}body{margin:0}hr{height:0;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}
a {text-decoration: none;}

/* Page layout */
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  line-height: 1.6;
  gap: 20px;
}
.home-nav, main, footer {width: min(630px, 100vw);}
.home-nav {
  margin-top: 20px;
  text-align: center;
}
main {
  flex-grow: 1;
}
footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 12px;
  margin-bottom: 20px;
  background-color: #f2f2f2;
  text-align: center;
}
@media (max-width: 630px) {
  footer {
    margin-bottom: 0
  }
}

/* Markdown generated elements */
main :is(h1) {
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

/* Custom elements */
.avatar {
  display: block;
  text-align: center;
  width: 12px; border-radius: 64px;
  margin: auto;
  opacity: 0.5;
  color: white;
}
.avatar:hover {
  opacity: 1;
}
.description {
  text-align: center;
  font-style: italic;
}
.pill-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 12px 0px;
}
.pill {
  background-color: #f2f2f2;
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 0.9rem;
}
.search-bar {
  width: 100%;
  font-size: 1.2em;
}
`;

interface CustomLumeData extends Lume.Data {
  kind: "unkown" | "home" | "post";
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
    tags,
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
        <nav class="home-nav">
          {kind === "home"
            ? (
              <img
                alt=""
                src="/cat512.avif"
                style="width: 128px; border-radius: 64px;"
              />
            )
            : (
              <a href="/">
                <div style="text-align: center">
                  ← Home
                </div>
              </a>
            )}
        </nav>
        <main class="content-area">
          {kind === "post"
            ? (
              <>
                <h1>{title}</h1>
                <p class="description">{description}</p>
                <div class="pill-container">
                  <span class="pill">
                    By Sufyan Dawoodjee
                  </span>
                  {created && (
                    <span class="pill">
                      Published{" "}
                      <time datetime={createdDateString}>
                        {createdDateString}
                      </time>
                    </span>
                  )}
                  {updated && (
                    <span class="pill">
                      Edited{" "}
                      <time datetime={updatedDateString}>
                        {updatedDateString}
                      </time>
                    </span>
                  )}
                </div>
                <div class="pill-container">
                  {tags.map((tag) => <span class="pill">{tag}</span>)}
                </div>
              </>
            )
            : null}
          {children}
        </main>
        <footer>
          <a href="/">Home</a>
          <form method="get" action="https://www.google.com/search">
            <input
              name="q"
              value="site:dawoodjee.com"
              hidden
            />
            <input
              type="search"
              name="q"
              placeholder="Search"
              class="search-bar"
            />
            <input type="submit" value="Search" hidden />
          </form>
          <div style="text-align: center">
            <a href={githubUrl}>
              Source for this page
            </a>
            {" • "}
            <a href="/feed.xml">RSS</a>
            {" • "}
            <a href="/feed.json">JSON Feed</a>
          </div>
          <div style="text-align: center">Sufyan Dawoodjee</div>
        </footer>
      </body>
    </html>
  );
};

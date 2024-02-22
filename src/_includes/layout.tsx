// no-op function to enable syntax highlighting in css block.
const css = (strings: TemplateStringsArray) => strings.raw[0];

/* Adapted from https://www.joshwcomeau.com/css/custom-css-reset/ */
const styles = css`
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
a {
  text-decoration: none;
}
body {
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font: 18px/1.5 "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  margin: 2rem 0;
}
main {
  min-height: calc(100vh - 200px);
}
footer {
  height: 200px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 12px;
  border-top: 1px dashed #aaa;
}
.content-area {
  margin: 0 auto;
  padding: 20px 10px;
  max-width: 650px;
}
h1 {
  text-align: center;
}
.pill-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 12px 0px;
}
.pill {
  background-color: #eee;
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 0.9rem;
}
.avatar {
  width: 128px;
  height: 128px;
  border-radius: 64px;
  margin: auto;
  opacity: 0.5;
  color: white;
}
.avatar:hover {
  opacity: 1;
}
`;

interface CustomLumeData extends Lume.Data {
  noTitle?: true;
  noPills?: true;
  opaqueAvatar?: true;
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
    tags,
    noTitle,
    noPills,
    opaqueAvatar,
    created,
    updated,
  }: CustomLumeData,
  helpers: Lume.Helpers,
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
        <main class="content-area">
          <a href="/">
            <img
              alt="Home"
              src="/cat512.avif"
              class="avatar"
              style={opaqueAvatar && "opacity: 1"}
            />
          </a>
          {noTitle ? null : <h1>{title}</h1>}
          {noPills ? null : (
            <div class="pill-container">
              <span class="pill">
                By Sufyan Dawoodjee
              </span>
              {created && (
                <span class="pill">
                  Published{" "}
                  <time datetime={createdDateString}>{createdDateString}</time>
                </span>
              )}
              {updated && (
                <span class="pill">
                  Edited{" "}
                  <time datetime={updatedDateString}>{updatedDateString}</time>
                </span>
              )}
            </div>
          )}
          <div class="pill-container">
            {tags.map((tag) => <span class="pill">{tag}</span>)}
          </div>
          {children}
        </main>
        <footer class="content-area">
          <form method="get" action="https://www.google.com/search">
            <input
              name="q"
              value="site:dawoodjee.com"
              hidden
              style="width: 100%"
            />
            <input
              type="search"
              name="q"
              placeholder="Search"
              style="width: 100%"
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

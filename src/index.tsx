export const title = "dawoodjee.com";
export const kind = "home";

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default ({ search }: Lume.Data) => {
  return (
    <>
      <img
        alt=""
        src="/cat512.avif"
        style="width: 128px; height: 128px; border-radius: 64px;"
      />
      <p class="subtitle">
        Sufyan programs and dabbles
      </p>
      <div class="inline-controls">
        <span class="control">
          eejdoowad AT gmail
        </span>
        <a class="control" href="https://github.com/eejdoowad">GitHub</a>
        <a
          href="https://docs.google.com/document/d/1U_FCfa9SF4lXnMFnVbS7BQOD4qt_iFXrE_rowdgv5KE/edit?usp=sharing&resourcekey=0-O6cf5_kPTwdW0jF2i3tWcQ"
          class="control"
        >
          Resume
        </a>
      </div>
      <nav>
        <ul>
          {search.pages().filter((page) => page.kind === "post").sort((a, b) =>
            b.created - a.created
          ).map((page) => (
            <li>
              <span class="monospace" style="margin-right: 12px;">
                {toDateString(page.created)}
              </span>{" "}
              <a href={page.url}>
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

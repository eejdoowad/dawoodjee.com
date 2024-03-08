export const title = "dawoodjee.com";
export const kind = "home";

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default ({ search }: Lume.Data) => {
  return (
    <>
      <p class="subtitle">
        Sufyan programs and dabbles
      </p>
      <div class="inline-controls">
        <span class="control">
          eejdoowad AT gmail
        </span>
        <a class="control" href="https://github.com/eejdoowad">GitHub</a>
        <a class="control" href="https://www.linkedin.com/in/sufyand">
          Linkedin
        </a>
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
              <span style="margin-right: 12px;">
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

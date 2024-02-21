export const title = "dawoodjee.com";
export const noTitle = true;
export const noPills = true;
export const opaqueAvatar = true;
export const id = "home";

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default (
  { search }: Lume.Data,
  helpers: Lume.Helpers,
) => (
  <>
    <p style="margin-top: 12px; text-align: center;">
      Sufyan programs and dabbles
      <div class="pill-container">
        <span class="pill">
          eejdoowad AT gmail
        </span>
        <a class="pill" href="https://github.com/eejdoowad">GitHub</a>
        <a class="pill" href="https://www.linkedin.com/in/sufyand">Linkedin</a>
        <a
          href="https://docs.google.com/document/d/1U_FCfa9SF4lXnMFnVbS7BQOD4qt_iFXrE_rowdgv5KE/edit?usp=sharing&resourcekey=0-O6cf5_kPTwdW0jF2i3tWcQ"
          class="pill"
        >
          Resume
        </a>
      </div>
    </p>
    <ul>
      {search.pages().filter((page) => page.id !== "home").map((page) => (
        <li>
          <span class="pill">
            {toDateString(page.created)}
          </span>{" "}
          <a href={page.url}>
            {page.title}
          </a>
        </li>
      ))}
    </ul>
  </>
);

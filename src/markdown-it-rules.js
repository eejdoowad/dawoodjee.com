/** Adds opening div to table: <table>...</table> becomes <div><table>...</table> */
export const table_open = (tokens, idx, options, env, self) =>
    `<div>${self.renderToken(tokens, idx, options)}`;

/** Adds closing div to table: <table>...</table> becomes <table>...</table></div> */
export const table_close = (tokens, idx, options, env, self) =>
    `${self.renderToken(tokens, idx, options)}</div>`;

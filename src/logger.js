// Logger
let DEBUG = false;
export const Log = {
  log: (...msgs) => {
    if (DEBUG) console.log(...msgs);
  },
  warn: (msg) => {
    if (DEBUG) console.warn(msg);
  },
  debug: (msg) => {
    if (DEBUG) console.debug(msg);
  },
  error: (msg) => {
    if (DEBUG) console.error(msg);
  },
};

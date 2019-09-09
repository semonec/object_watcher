// Logger

let DEBUG = false;

/**
 * Logger - 콘솔에 커멘드를 표시
 * log(), warn(), debug(), error() 가 있으며
 * logger 내 DEBUG 변수 값에 따라 표시 여부가 결정
 * default: false, 출력되지 않음
 */
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

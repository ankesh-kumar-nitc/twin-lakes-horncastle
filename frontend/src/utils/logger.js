// Lightweight dev-only logger. In production builds this becomes a no-op
// so that error output does not clutter user browsers or leak diagnostics.
const isDev = process.env.NODE_ENV !== 'production';

export const logger = {
  error: (...args) => { if (isDev) console.error(...args); },
  warn: (...args) => { if (isDev) console.warn(...args); },
  info: (...args) => { if (isDev) console.info(...args); },
};

export default logger;

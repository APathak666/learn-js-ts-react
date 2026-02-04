// TODO: implement higher-order helpers.

// Returns a function that prepends the prefix.
// Example: const log = createPrefixedLogger('[API]'); log('ready') => "[API] ready"
export function createPrefixedLogger(prefix: string) {
  return (message: string) => message;
}

// Returns a function that only runs once. Subsequent calls return the first result.
export function once<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> => {
    return fn(...args);
  };
}

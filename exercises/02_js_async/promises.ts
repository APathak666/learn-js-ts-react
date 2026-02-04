// TODO: implement delay and withTimeout.

export function delay(ms: number): Promise<void> {
  return Promise.resolve();
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return promise;
}

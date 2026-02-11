// TODO: implement delay and withTimeout.

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, ms)
  })
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timer = new Promise<T>((resolve, reject) => {
      setTimeout(() => { reject(new Error("Timeout")) }, ms)
    });

  return Promise.race([timer, promise]);
}

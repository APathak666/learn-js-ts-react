// TODO: implement type-safe property helpers.

export function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

export function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  let new_obj = {...obj};
  new_obj[key] = value;
  return new_obj;
}

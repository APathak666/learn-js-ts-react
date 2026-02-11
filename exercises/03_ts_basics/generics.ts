// TODO: implement generic helpers.

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id)
}

export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return items.reduce((obj, item) => {
    let key: K = keyFn(item);
    if (obj[key] !== undefined) { obj[key].push(item); }
    else {
      obj[key] = [];
      obj[key].push(item);
    }
    return obj;
  }, {} as Record<K, T[]>);

}

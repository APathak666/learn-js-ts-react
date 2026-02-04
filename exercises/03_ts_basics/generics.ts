// TODO: implement generic helpers.

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return undefined;
}

export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return {} as Record<K, T[]>;
}

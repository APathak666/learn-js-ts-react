export interface PollOptions {
  intervalMs: number;
  maxAttempts: number;
}

// TODO: poll until predicate returns true or attempts run out.
export async function pollUntil<T>(
  fn: () => Promise<T>,
  predicate: (value: T) => boolean,
  options: PollOptions
): Promise<{ status: 'SUCCESS'; value: T } | { status: 'TIMEOUT' }> {
  return { status: 'TIMEOUT' };
}

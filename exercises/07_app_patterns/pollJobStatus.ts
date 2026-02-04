export type JobState = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface PollOptions {
  intervalMs: number;
  maxAttempts: number;
}

// TODO: poll until COMPLETED/FAILED/CANCELLED or timeout.
export async function pollJobStatus(
  getStatus: () => Promise<JobState>,
  options: PollOptions
): Promise<'COMPLETED' | 'FAILED' | 'CANCELLED' | 'TIMEOUT'> {
  return 'TIMEOUT';
}

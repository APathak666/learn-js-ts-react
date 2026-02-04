export type Status = 'DRAFT' | 'TRAINING' | 'READY';

// TODO: return a human-friendly label.
export function statusLabel(status: Status): string {
  return '';
}

// TODO: return true if status is TRAINING.
export function isBusy(status: Status): boolean {
  return false;
}

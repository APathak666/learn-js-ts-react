// TODO: define enum AppStep similar to the app.
export enum AppStep {
  // fill in: UPLOAD, STRUCTURE, TRAINING, ACTIVE_TRAINING, PLAYGROUND
}

// TODO: return true for steps before training starts (UPLOAD or STRUCTURE).
export function isSetupStep(step: AppStep): boolean {
  return false;
}

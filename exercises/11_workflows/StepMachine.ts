export enum WorkflowStep {
  Upload = 'UPLOAD',
  Configure = 'CONFIGURE',
  Processing = 'PROCESSING',
  Training = 'TRAINING',
  Complete = 'COMPLETE',
}

const STEP_ORDER: WorkflowStep[] = [
  WorkflowStep.Upload,
  WorkflowStep.Configure,
  WorkflowStep.Processing,
  WorkflowStep.Training,
  WorkflowStep.Complete,
];

// TODO: return the next step in the workflow.
// If already at Complete, return Complete.
export function nextStep(current: WorkflowStep): WorkflowStep {
  return current;
}

// TODO: return true if the step is before Processing
// (i.e., Upload or Configure).
export function isSetupPhase(step: WorkflowStep): boolean {
  return false;
}

// TODO: return true if the step is a terminal state (Complete).
export function isTerminal(step: WorkflowStep): boolean {
  return false;
}

// TODO: return the 0-based index of the step (Upload=0, Configure=1, ...).
export function stepIndex(step: WorkflowStep): number {
  return -1;
}

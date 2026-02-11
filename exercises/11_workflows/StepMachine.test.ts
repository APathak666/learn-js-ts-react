import { describe, it, expect } from 'vitest';
import { WorkflowStep, nextStep, isSetupPhase, isTerminal, stepIndex } from './StepMachine';

describe('StepMachine', () => {
  it('nextStep progresses through workflow', () => {
    expect(nextStep(WorkflowStep.Upload)).toBe(WorkflowStep.Configure);
    expect(nextStep(WorkflowStep.Configure)).toBe(WorkflowStep.Processing);
    expect(nextStep(WorkflowStep.Processing)).toBe(WorkflowStep.Training);
    expect(nextStep(WorkflowStep.Training)).toBe(WorkflowStep.Complete);
  });

  it('nextStep stays at Complete', () => {
    expect(nextStep(WorkflowStep.Complete)).toBe(WorkflowStep.Complete);
  });

  it('isSetupPhase', () => {
    expect(isSetupPhase(WorkflowStep.Upload)).toBe(true);
    expect(isSetupPhase(WorkflowStep.Configure)).toBe(true);
    expect(isSetupPhase(WorkflowStep.Processing)).toBe(false);
    expect(isSetupPhase(WorkflowStep.Complete)).toBe(false);
  });

  it('isTerminal', () => {
    expect(isTerminal(WorkflowStep.Upload)).toBe(false);
    expect(isTerminal(WorkflowStep.Complete)).toBe(true);
  });

  it('stepIndex', () => {
    expect(stepIndex(WorkflowStep.Upload)).toBe(0);
    expect(stepIndex(WorkflowStep.Configure)).toBe(1);
    expect(stepIndex(WorkflowStep.Complete)).toBe(4);
  });
});

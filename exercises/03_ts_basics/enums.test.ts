import { describe, it, expect } from 'vitest';
import { AppStep, isSetupStep } from './enums';

describe('enums', () => {
  it('isSetupStep', () => {
    expect(isSetupStep(AppStep.UPLOAD)).toBe(true);
    expect(isSetupStep(AppStep.STRUCTURE)).toBe(true);
    expect(isSetupStep(AppStep.TRAINING)).toBe(false);
  });
});

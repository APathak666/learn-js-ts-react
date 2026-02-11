import React, { useState } from 'react';

type Step = 'UPLOAD' | 'PROCESSING' | 'DONE';

interface MiniWorkflowProps {
  onUpload: () => Promise<void>;
  onProcess: () => Promise<void>;
}

// TODO: implement a mini workflow component.
//
// The workflow has three steps: UPLOAD → PROCESSING → DONE.
//
// Requirements:
// - Display the current step in a span with data-testid="step".
// - At the UPLOAD step, show a button labeled "Upload".
//   Clicking it calls onUpload(). On success, move to PROCESSING.
// - At the PROCESSING step, show a button labeled "Process".
//   Clicking it calls onProcess(). On success, move to DONE.
// - At the DONE step, show a message containing the word "Complete".
// - While an async action is in progress, show a span with data-testid="loading".
//   Hide it when the action finishes.
// - If onUpload or onProcess throws, show the error message in a
//   span with data-testid="error" and stay on the current step.
export const MiniWorkflow: React.FC<MiniWorkflowProps> = ({ onUpload, onProcess }) => {
  const [step, setStep] = useState<Step>('UPLOAD');

  return (
    <div>
      <span data-testid="step">{step}</span>
    </div>
  );
};

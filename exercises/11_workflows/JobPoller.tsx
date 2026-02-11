import React, { useEffect, useRef, useState } from 'react';

export type JobState = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

interface JobPollerProps {
  getStatus: () => Promise<JobState>;
  intervalMs: number;
}

// TODO: implement a component that polls job status.
// - Start polling immediately on mount.
// - Poll every intervalMs.
// - Display the current state in a span with data-testid="status".
// - When state is COMPLETED or FAILED, stop polling.
// - Clean up the interval on unmount.
export const JobPoller: React.FC<JobPollerProps> = ({ getStatus, intervalMs }) => {
  const [state, setState] = useState<JobState>('PENDING');

  return (
    <div>
      <span data-testid="status">{state}</span>
    </div>
  );
};

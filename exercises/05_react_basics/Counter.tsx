import React, { useState } from 'react';

// TODO: implement a counter with Increment and Reset buttons.
// - Start at 0
// - Increment adds 1
// - Reset sets back to 0
export const Counter: React.FC = () => {
  return (
    <div>
      <span data-testid="count">0</span>
      <button>Increment</button>
      <button>Reset</button>
    </div>
  );
};

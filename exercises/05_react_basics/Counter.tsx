import React, { useState } from 'react';

// TODO: implement a counter with Increment and Reset buttons.
// - Start at 0
// - Increment adds 1
// - Reset sets back to 0
export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount(count+1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};

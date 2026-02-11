import React, { useEffect, useState } from 'react';

// TODO: increment seconds every 1s using useEffect + setInterval.
export const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(seconds => seconds+1)
    }, 1000)

    return () => clearInterval(id);
  }, [])

  return (
    <div>
      <span data-testid="seconds">{seconds}</span>
    </div>
  );
};

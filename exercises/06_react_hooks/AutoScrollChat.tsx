import React, { useEffect, useRef } from 'react';

interface AutoScrollChatProps {
  messages: string[];
}

// TODO: scroll to bottom whenever messages change.
export const AutoScrollChat: React.FC<AutoScrollChatProps> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      data-testid="chat"
      style={{ height: 80, overflowY: 'auto', border: '1px solid #ccc' }}
    >
      {messages.map((m, i) => (
        <div key={i}>{m}</div>
      ))}
    </div>
  );
};

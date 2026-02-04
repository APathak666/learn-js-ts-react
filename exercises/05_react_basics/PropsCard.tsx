import React from 'react';

type Status = 'DRAFT' | 'TRAINING' | 'READY';

interface PropsCardProps {
  name: string;
  status: Status;
  onSelect?: () => void;
}

// TODO: render name and status. Call onSelect when clicked.
export const PropsCard: React.FC<PropsCardProps> = ({ name, status, onSelect }) => {
  return (
    <div>
      <h3>{name}</h3>
      <span>{status}</span>
    </div>
  );
};

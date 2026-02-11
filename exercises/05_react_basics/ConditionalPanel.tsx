import React from 'react';

interface ConditionalPanelProps {
  isLoading: boolean;
  error?: string | null;
  children?: React.ReactNode;
}

// TODO: render "Loading..." when isLoading,
// else render error if present, else render children.
export const ConditionalPanel: React.FC<ConditionalPanelProps> = ({ isLoading, error, children }) => {
  if (isLoading) { return <div>Loading...</div> }
  else if (error !== undefined) { return <div>{error}</div> }
  else { return <div>{children}</div> }
};

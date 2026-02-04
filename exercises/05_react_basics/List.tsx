import React from 'react';

interface ListProps {
  items: string[];
}

// TODO: render a <ul> with <li> for each item.
// If items is empty, render "No items".
export const List: React.FC<ListProps> = ({ items }) => {
  return (
    <div>
      <ul></ul>
    </div>
  );
};

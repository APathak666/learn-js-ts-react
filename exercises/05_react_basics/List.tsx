import React from 'react';

interface ListProps {
  items: string[];
}

// TODO: render a <ul> with <li> for each item.
// If items is empty, render "No items".
export const List: React.FC<ListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div><p>No items</p></div>
    )}

  return (
    <div>
      <ul>{items.map(item => (
        <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { AutoScrollChat } from './AutoScrollChat';

describe('AutoScrollChat', () => {
  it('scrolls to bottom on new messages', async () => {
    const { rerender, getByTestId } = render(<AutoScrollChat messages={['a']} />);
    const chat = getByTestId('chat');

    Object.defineProperty(chat, 'scrollHeight', { value: 100, configurable: true });
    chat.scrollTop = 0;

    rerender(<AutoScrollChat messages={['a', 'b', 'c']} />);

    // let effects run
    await Promise.resolve();

    expect(chat.scrollTop).toBe(100);
  });
});

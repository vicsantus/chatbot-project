import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  test('1-Testa o Header Geral', async () => {
    const { history } = renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );
    act(() => {
      history.push('/about');
    });

    const btnHome = screen.getByText(/HOME/i);
    userEvent.click(btnHome);
    await waitFor(() => {
      const inputMsg = screen.getByRole('textbox');
      expect(inputMsg).toBeInTheDocument();
    });
  });
});

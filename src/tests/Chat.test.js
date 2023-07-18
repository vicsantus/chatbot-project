import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa o componente Chat', () => {
  test('1-Testa se o chat esta funcionando de modo geral', async () => {
    renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );

    const inputMsg = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');

    userEvent.type(inputMsg, 'hello');
    userEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/how are you/i)).toBeInTheDocument();
    });
  });

  test('2-Testa se ao clicar em enter, envia a mensagem', async () => {
    renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );

    const inputMsg = screen.getByRole('textbox');
    
    userEvent.type(inputMsg, 'hello');
    fireEvent.keyDown(inputMsg, { key: 'Enter', code: 'Enter', keyCode: 13 });

    await waitFor(() => {
      expect(screen.getByText(/how are you/i)).toBeInTheDocument();
    });
  });
});

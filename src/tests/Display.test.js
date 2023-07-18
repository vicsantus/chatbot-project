import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

const rendOk = async () => {
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
    const userMessage = screen.getByText(/hello/i);
    expect(userMessage).toHaveClass('msg-user');
  });
  
  await waitFor(() => {
    const botMessage = screen.getByText(/I am the Lexart Chatbot/i);
    expect(botMessage).toHaveClass('msg-bot');
  });
};

function awaitForATime(action, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      action();
      resolve();
    }, time);
  });
}


describe('Testa o componente Display', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('1-Testa se o Display renderiza corretamente', rendOk)
  test('2-Testa a função de link do Display', async () => {
    jest.setTimeout(30000);
    
    const mockWindowOpen = jest.fn();
    window.open = mockWindowOpen;
    rendOk();
    
    const inputMsg = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    
    const sendLexart = () => {
      userEvent.type(inputMsg, 'lexart');
      userEvent.click(sendButton);
    }
    
    await awaitForATime(sendLexart, 500);

    const sendLexart123 = () => {
      userEvent.type(inputMsg, 'lexart123');
      userEvent.click(sendButton);
    }
    await awaitForATime(sendLexart123, 500)
    
    const send1 = () => {
      userEvent.type(inputMsg, '1');
      userEvent.click(sendButton);
    }
    await awaitForATime(send1, 500)
    
    await waitFor(() => {
      const divLink = screen.getByText('https://lexartlabs.com/products/');
      expect(divLink).toHaveClass('msg-bot-link');
    });
    userEvent.click(screen.getByText('https://lexartlabs.com/products/'));

    await waitFor(() => {
      expect(mockWindowOpen)
      .toHaveBeenCalledWith('https://lexartlabs.com/products/ ', '_blank');
    });
  });
});

import { screen, waitFor } from '@testing-library/react';
import React from 'react';
// import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa o componente Chat', () => {
  test('1-Testa se o chat esta funcionando de modo geral', async () => {
    const { history } = renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );

    act(() => {
      history.push('/about');
    });

    const inputMsg = screen.getByText(/About Page/i);

    await waitFor(() => {
      expect(inputMsg).toBeInTheDocument();
    });
  });
});

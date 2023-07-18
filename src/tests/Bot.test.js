// Importa as bibliotecas necessárias
import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import ChatProvider from '../context/ChatProvider';
import { renderWithRouter } from './helpers/renderWith';

// Descreve o grupo de testes
describe('Testa o componente Bot', () => {
  // Configuração antes de cada teste
  beforeEach(() => {
    jest.setTimeout(30000); // Define o tempo limite para o teste
  })

  // Limpa os mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks();
  })

  // Teste principal que verifica se as rotas do bot estão funcionando como deveriam
  test('1-Testa as rotas do bot estão funcionando como deveriam', async () => {
    // Cria um mock para a função window.open para simular o comportamento de abrir uma nova aba
    const mockWindowOpen = jest.fn();
    window.open = mockWindowOpen;

    // Renderiza o componente App dentro do ChatProvider e utiliza a função renderWithRouter para testar as rotas
    renderWithRouter(
      <ChatProvider>
        <App />
      </ChatProvider>,
    );
  
    // Obtém os elementos do input de mensagem e do botão de envio através dos papéis do acessibilidade
    const inputMsg = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
  
    // Digita 'hello' no chat e clica no botão de envio
    userEvent.type(inputMsg, 'hello');
    userEvent.click(sendButton);
  
    await waitFor(() => {
      const botMessage = screen.getByText(/I am the Lexart Chatbot/i);
      expect(botMessage).toBeInTheDocument();
    });

    // Repete o processo de digitar mensagens e verificar a resposta do bot para diferentes cenários
    // Cada bloco a seguir representa um caso diferente

    // Caso 1: Digita 'lexicoart' user errado
    userEvent.type(inputMsg, 'lexicoart');
    userEvent.click(sendButton);

    await waitFor(() => {
      const botMessage = screen.getByText(/Now please enter/i);
      expect(botMessage).toBeInTheDocument();
    });
    
    // Caso 2: Digita 'lexart' senha errada
    userEvent.type(inputMsg, 'lexart');
    userEvent.click(sendButton);

    await waitFor(() => {
      const botMessage = screen.getByText(/User does not exist/i);
      expect(botMessage).toBeInTheDocument();
    });

    // Caso 3: Digita 'lexart' user certo
    userEvent.type(inputMsg, 'lexart');
    userEvent.click(sendButton);

    await waitFor(() => {
      const botMessage = screen.getByText(/Password does not match/i);
      expect(botMessage).toBeInTheDocument();
    });

    // Caso 4: Digita 'lexart123' senha certa
    userEvent.type(inputMsg, 'lexart123');
    userEvent.click(sendButton);
    await waitFor(() => {
      const botMessage = screen.getByText(/Do you want to apply for a loan/i);
      expect(botMessage).toBeInTheDocument();
    });
    await waitFor(() => {
      const botMessage = screen.getByText(/Loan conditions/i);
      expect(botMessage).toBeInTheDocument();
    });
    await waitFor(() => {
      const botMessage = screen.getByText(/Help/i);
      expect(botMessage).toBeInTheDocument();
    });
    
    // Caso 5: Digita '1' para fazer loan
    userEvent.type(inputMsg, '1');
    userEvent.click(sendButton);
    await waitFor(() => {
      const botMessage = screen.getByText(/Loan will be made/i);
      expect(botMessage).toBeInTheDocument();
    });


    // Caso 6: Digita '2' para informações de loan
    userEvent.type(inputMsg, '2');
    userEvent.click(sendButton);
    await waitFor(() => {
      const botMessage = screen.getByText(/the interest rate and fees associated/i);
      expect(botMessage).toBeInTheDocument();
    });

    // Caso 7: Digita '3' para pedir opções novamente
    userEvent.type(inputMsg, '3');
    userEvent.click(sendButton);
    await waitFor(() => {
      const botMessage = screen.getByText(/Look at the options again/i);
      expect(botMessage).toBeInTheDocument();
    });

    // Caso 8: Digita '93' errar uma opção
    userEvent.type(inputMsg, '93');
    userEvent.click(sendButton);
    await waitFor(() => {
      const botMessage = screen.getByText(/This is not an option/i);
      expect(botMessage).toBeInTheDocument();
    });
  });
});

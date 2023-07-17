/* eslint-disable react-hooks/exhaustive-deps */
// Aviso desabilitado para a dependência exhaustiveness do ESLint

import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function LoanStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);

  // Função para exibir as opções novamente
  function optionsAgain() {
    return [ // Retorna um array com as mensagens de opção
      {
        idConv: conversationId,
        date: new Date(Date.now()).toLocaleString(),
        who: 'bot',
        msg: `Look at the options again.`
      },
      {
        idConv: conversationId,
        date: new Date(Date.now()).toLocaleString(),
        who: 'bot',
        msg: `1 - Do you want to apply for a loan?`
      },
      {
        idConv: conversationId,
        date: new Date(Date.now()).toLocaleString(),
        who: 'bot',
        msg: `2 - Loan conditions`
      },
      {
        idConv: conversationId,
        date: new Date(Date.now()).toLocaleString(),
        who: 'bot',
        msg: `3 - Help`
      }
    ];
  }

  // Função para criar a conversa com base na escolha do usuário
  function makeConversation() {
    if ('1' === atualUser.toLowerCase()) {
      // Se a opção escolhida pelo usuário for '1'
      setTextData([ 
        ...textData,
        // Adiciona as mensagens da conversa relacionadas à escolha
        {
          idConv: conversationId,
          date: new Date(Date.now()).toLocaleString(),
          who: 'bot',
          msg: 'Loan will be made. Click on the link to make your loan!'
        },
        {
          idConv: conversationId,
          date: new Date(Date.now()).toLocaleString(),
          who: 'bot-link',
          msg: 'https://lexartlabs.com/products/'
        }
      ]);

    } else if ('2' === atualUser.toLowerCase()) {
      // Se a opção escolhida pelo usuário for '2'
      setTextData([
        ...textData,
        // Adiciona as mensagens da conversa relacionadas à escolha
        {
          idConv: conversationId,
          date: new Date(Date.now()).toLocaleString(),
          who: 'bot',
          msg: `Loan terms refer to the terms and conditions involved 
          when borrowing money. This can include the loan's repayment 
          period, the interest rate and fees associated with the loan, 
          penalty fees borrowers might be charged, and any other special 
          conditions that may apply. Reviewing loan terms carefully is 
          important for understanding your obligations when taking 
          out a loan. Click on the link to see all the conditions!`
        },
        {
          idConv: conversationId,
          date: new Date(Date.now()).toLocaleString(),
          who: 'bot-link',
          msg: 'https://lexartlabs.com/for-developers/'
        }
      ]);

      } else if ('3' === atualUser.toLowerCase()) {
        // Se a opção escolhida pelo usuário for '3'
        setTextData([...textData, ...optionsAgain()]);
        // Adiciona as mensagens de opção novamente

      } else if ('goodbye' === atualUser.toLowerCase()) {
        // Se a opção escolhida pelo usuário for 'goodbye'
        setTextData([ 
          ...textData,
          // Adiciona a mensagem de despedida e chama a função MakeCSV
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Goodbye! To the next!'
          }
        ]);
        MakeCSV(textData); // Chama a função MakeCSV passando o array textData como argumento
        setConversationId(conversationId + 1); // Incrementa o conversationId e atualiza o estado
        setConversationStage('start'); // Define a próxima etapa da conversa como 'start' novamente

    } else if (atualUser) {
      // Se o usuário inseriu uma opção inválida
      setTextData([ 
        ...textData,
        // Adiciona a mensagem de erro e as opções novamente
        {
          idConv: conversationId,
          date: new Date(Date.now()).toLocaleString(),
          who: 'bot',
          msg: 'This is not an option!'
        },
        ...optionsAgain(),
      ]);
    }
  }

  // Utilização do hook useEffect para realizar ações quando o estado de textData muda
  useEffect(() => {
    // A função dentro do useEffect será executada toda vez que o estado de textData mudar
    if (conversationStage === 'loanStage' 
      && textData[textData.length - 1].who === 'user') {
        // Verificação se a etapa da conversa é 'loanStage' e se a última mensagem é do usuário
        makeConversation(); // Chama a função para criar a conversa com base na escolha do usuário
    }
  }, [textData]); // O gatilho para o useEffect é o estado textData
}

export default LoanStage
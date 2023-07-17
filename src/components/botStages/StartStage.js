/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function StartStage({MakeCSV}) {
  // Aqui, o componente usa o hook useContext para acessar o estado do contexto do ChatContext
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const {setTimeToDo} = useContext(ChatContext);

  // O hook useEffect é usado para realizar ações quando o estado do componente muda
  useEffect(() => {
    // A função dentro do useEffect será executada sempre que o estado de textData ou conversationStage mudar
    if (conversationStage === 'start' && textData[textData.length - 1]?.who === 'user') {
      if (['hello', 'good', 'i want'].includes(atualUser.toLowerCase())) {
        // Aqui, é adicionado uma nova mensagem ao array textData com base nas condições
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Hi how are you? I am the Lexart Chatbot. Please enter your username!'
          }
        ]);
        setConversationStage('userStage'); // Define a próxima etapa da conversa como 'userStage'
        setTimeToDo('pass'); // Define o estado inicial para pass novamente, para novamente definir password


      } else if ('goodbye' === atualUser.toLowerCase()) {
        // Adiciona uma nova mensagem de despedida ao array textData e chama a função MakeCSV
        setTextData([ 
          ...textData,
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
        // Adiciona uma nova mensagem informando que o bot não entendeu o que foi dito
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Did not understand what you said.'
          }
        ]);
      }
    }
  }, [textData, conversationStage]); // Os gatilhos para o useEffect são textData e conversationStage
}

export default StartStage
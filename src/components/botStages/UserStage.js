/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function UserStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const {setCheckUser} = useContext(ChatContext);

  // Utilização do hook useEffect para realizar ações quando o estado de textData muda
  useEffect(() => {
    // A função dentro do useEffect será executada toda vez que o estado de textData mudar
    if (conversationStage === 'userStage' && textData[textData.length - 1].who === 'user') {
      // Verificação se a etapa da conversa é 'userStage' e se a última mensagem é do usuário

      if (!['hello', 'good', 'i want', 'goodbye'].includes(atualUser.toLowerCase())) {
        // Se a entrada do usuário não for 'hello', 'good', 'i want', ou 'goodbye'
        setCheckUser({
          user: atualUser.toLowerCase()
        });
        
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Ok! Now please enter your password!'
          }
        ]);
        setConversationStage('checkStage'); // Define a próxima etapa da conversa como 'checkStage'

      } else if (['hello', 'good', 'i want'].includes(atualUser.toLowerCase())) {
        // Se a entrada do usuário for 'hello', 'good', ou 'i want'
        setConversationStage('start'); // Define a próxima etapa da conversa como 'start'

      } else if ('goodbye' === atualUser.toLowerCase()) {
        // Se a entrada do usuário for 'goodbye'
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
        // Se a entrada do usuário não corresponder a nenhum caso acima
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
  }, [textData]);
}

export default UserStage
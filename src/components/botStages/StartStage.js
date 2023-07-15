/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function StartStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);


  useEffect(() => {
    if (conversationStage === 'start' && textData[textData.length - 1]?.who === 'user') {
      if (['hello', 'good', 'i want'].includes(atualUser.toLowerCase())) {
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Hi how are you! Please enter your username!'
          }
        ]);
        setConversationStage('userStage');
      } else if ('goodbye' === atualUser.toLowerCase()) {
        MakeCSV(textData);
        setConversationId(conversationId + 1)
        setConversationStage('start');
      } else if (atualUser) {
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
  }, [textData, conversationStage]);

  useEffect(() => {
    console.log(conversationStage);
  }, [conversationStage])
}

export default StartStage
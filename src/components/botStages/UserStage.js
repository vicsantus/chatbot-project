/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function UserStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);


  useEffect(() => {
    if (conversationStage === 'userStage') {
      if (!['hello', 'good', 'i want', 'goodbye'].includes(atualUser.toLowerCase())) {
        console.log('ENTROU!!!!!!!!!!!!!!!!');
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Ok! Now please enter your password!'
          }
        ]);
        // setConversationStage('xxxxxxx');
      } else if ('goodbye' === atualUser.toLowerCase()) {
        MakeCSV(textData);
        setConversationId(conversationId + 1);
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
  }, [atualUser]);

  useEffect(() => {
    console.log(conversationStage);
  }, [conversationStage])
}

export default UserStage
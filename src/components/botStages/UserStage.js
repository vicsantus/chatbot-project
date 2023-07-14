/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function UserStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const {setCheckUser} = useContext(ChatContext);


  useEffect(() => {
    if (conversationStage === 'userStage') {
      if (!['hello', 'good', 'i want', 'goodbye'].includes(atualUser.toLowerCase())) {
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
        setConversationStage('checkStage');
      } else if (['hello', 'good', 'i want'].includes(atualUser.toLowerCase())) {
        setConversationStage('start');
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
}

export default UserStage
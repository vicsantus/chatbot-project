/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import ChatContext from '../../context/ChatContext';

function LoanStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {userAndPass} = useContext(ChatContext);
  const {checkUser, setCheckUser} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const [timeToDo, setTimeToDo] = useState('');

  useEffect(() => {
    if (timeToDo === 'pass' && textData[textData.length - 1].who === 'user') {
      setCheckUser({
        ...checkUser,
        pass: atualUser.toLowerCase(),
      });
    setTimeToDo('');

    }
    if (timeToDo === 'user' && textData[textData.length - 1].who === 'user') {
      setCheckUser({
        ...checkUser,
        user: atualUser.toLowerCase(),
      });
    setTimeToDo('');

    }
  }, [textData]);

  function makeConversation() {
    if (userAndPass.user !== checkUser.user && 'goodbye' !== atualUser.toLowerCase()) {
      setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'User does not exist! Retype the username!'
          }
        ]);
        setTimeToDo('user');

      } else if (userAndPass.pass !== checkUser.pass && 'goodbye' !== atualUser.toLowerCase()) {
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Password does not match! Retype the password!'
          }
        ]);
        setTimeToDo('pass');

       } else if ('goodbye' === atualUser.toLowerCase()) {
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Goodbye! To the next!'
          }
        ]);
        MakeCSV(textData);
        setConversationId(conversationId + 1);
        setConversationStage('start');

      } else {
        setTextData([ 
          ...textData,
          {
            idConv: conversationId,
            date: new Date(Date.now()).toLocaleString(),
            who: 'bot',
            msg: 'Proximo passo!'
          }
        ]);
        setConversationStage('proximopasso');
        
      }
  }

  useEffect(() => {
    if (timeToDo === '' && conversationStage === 'loanStage') makeConversation();
  }, [timeToDo])

  useEffect(() => {
    if (conversationStage === 'loanStage' 
    && textData[textData.length - 1].who === 'user') {
      if (checkUser.pass === undefined) {
        setCheckUser({
            ...checkUser,
            pass: atualUser.toLowerCase(),
          });
      };
      if (timeToDo === '') makeConversation();
    }
  }, [textData]);
}

export default LoanStage
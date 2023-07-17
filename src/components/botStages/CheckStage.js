/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function CheckStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {userAndPass} = useContext(ChatContext);
  const {checkUser, setCheckUser} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);
  const {timeToDo, setTimeToDo} = useContext(ChatContext);

  useEffect(() => {
    if (conversationStage === 'checkStage' 
    && textData[textData.length - 1].who === 'user') {
      if (timeToDo === 'pass') {
        textData[textData.length - 1].who = 'user-pass'; // Caso seja a senha do user, troca who para user-pass
        textData[textData.length - 1].msg = Array.from({ length: textData[textData.length - 1]
          .msg.length }, () => '*').join(''); // Caso seja a senha do user, troca o conteudo para asterisco
        setCheckUser({
          ...checkUser,
          pass: atualUser.toLowerCase(),
        });
      setTimeToDo('');

      }
      if (timeToDo === 'user') {
        setCheckUser({
          ...checkUser,
          user: atualUser.toLowerCase(),
        });
      setTimeToDo('');

      }
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
        ]);
        setConversationStage('loanStage');
      }
  }

  useEffect(() => {
    if (timeToDo === '' && conversationStage === 'checkStage') makeConversation();
  }, [timeToDo])

  useEffect(() => {
    if (conversationStage === 'checkStage' 
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

export default CheckStage
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import ChatContext from '../../context/ChatContext';

function LoanStage({MakeCSV}) {
  const {atualUser} = useContext(ChatContext);
  const {textData, setTextData} = useContext(ChatContext);
  const {conversationId, setConversationId} = useContext(ChatContext);
  const {conversationStage, setConversationStage} = useContext(ChatContext);

  function optionsAgain() {
    return [ 
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

  function makeConversation() {
    if ('1' === atualUser.toLowerCase()) {
      setTextData([ 
        ...textData,
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
      setTextData([
        ...textData,
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
        setTextData([...textData, ...optionsAgain()]);
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

    } else if (atualUser) {
      setTextData([ 
        ...textData,
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

  useEffect(() => {
    if (conversationStage === 'loanStage' 
    && textData[textData.length - 1].who === 'user') {
      makeConversation();
    }
  }, [textData]);
}

export default LoanStage
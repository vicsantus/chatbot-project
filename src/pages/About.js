import React from 'react';

const About = () => {
  // Componente funcional "About" representa a página "About" do chatbot de empréstimos

  return (
    <>
      <h1 style={{color: '#fff'}}>About Page</h1>
      <div style={{color: '#fff'}} className='about'>
        <p>This chatbot was created by Victor Santos for a Lexart Labs.</p>
        <p>The chatbot is designed to handle loan requests and provide information about loan conditions.</p>
        <p>It interacts with users and guides them through the loan application process.</p>
        <p>Feel free to explore and interact with the chatbot to experience its functionalities!</p>
      </div>
    </>
  );
};

export default About;
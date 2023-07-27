import React, { useState } from 'react';


const SubDeck = ({ cards, name, clickHandlerDelete, clickHandlerAddCard }) => {
  
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
  return (

    <div className='sub-deck'>
      <div className='sub-deck-component'>
        {cards.map((card) => (
          <div className='sub-deck-card-container' key={card.id}>
            <div className='card-content'>
              <p>{card.question} {card.answer}</p>
            </div>
            <div className='delete-button-container'>
              <button className='delete-button'>Delete</button>
            </div>
          </div>
        ))}
          <div className='input-container'>
        <input className='question-box' placeholder='question...' value={question} onChange={(e) => setQuestion(e.target.value)}/>
        <input className='answer-box' placeholder='answer...' value={answer} onChange={(e) => setAnswer(e.target.value)}/>
        <button className='add-card-button' onClick={() => clickHandlerAddCard(name, question, answer)}>+ Add Card</button>
        <button className='delete-deck-button' onClick={() => clickHandlerDelete(name)}>Delete Deck</button>
        </div>
      </div>
    </div>
  );
};



export default SubDeck;
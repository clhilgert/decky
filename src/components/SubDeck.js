import React from 'react';


const SubDeck = ({ cards }) => {
  console.log(cards);

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
        <input className='question-box' placeholder='question...' />
        <input className='answer-box' placeholder='answer...' />
        <button className='add-card-button'>+ Add Card</button>
        </div>
      </div>
    </div>
  );
};



export default SubDeck;
import React from 'react';

const Deck = ( {name, onClick, cards} ) => {

  
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }
  return (
    <div>
      <div className='deck' onClick={handleClick} cards={cards}>
        {name}
      </div>
    </div>
  )
}

export default Deck;
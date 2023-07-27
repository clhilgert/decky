import React from 'react';
import Deck from './Deck'

const DeckContainer = ( {decks, clickHandler, clickHandlerAlt} ) => {
  const deckArr = [];
  decks.forEach((deck, index) => {
    const handleClick = () => clickHandler(index);
    deckArr.push(<Deck name={deck.name} onClick={handleClick} key={index} cards={deck.flashcards}/>)
  })
  deckArr.push(<Deck name='+ Add New' key='add-new' onClick={clickHandlerAlt}/>)
  return (
    <div>
      <div className='deck-container'>
        {deckArr}
      </div>
    </div>
  )
}

export default DeckContainer;
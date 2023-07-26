import React from 'react';
import Deck from './Deck'

const DeckContainer = ( {decks, clickHandler} ) => {
  const deckArr = [];
  decks.forEach((deck, index) => {
    const handleClick = () => clickHandler(index);
    deckArr.push(<Deck name={deck.deck_name} onClick={handleClick} id={index} cards={deck.flashcards}/>)
  })
  deckArr.push(<Deck name='+ Add New'/>)
  console.log(deckArr)
  return (
    <div>
      <div className='deck-container'>
        {deckArr}
      </div>
    </div>
  )
}

export default DeckContainer;
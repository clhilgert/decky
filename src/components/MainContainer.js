import React, { useEffect, useState } from 'react';
import Card from './Card'
import ButtonContainer from './ButtonContainer';
import DeckContainer from './DeckContainer';
import SubDeck from './SubDeck';
import axios from 'axios';



const data = require('../db/db.json');

const MainContainer = () => {

  useEffect(() => {
    // Fetch flashcards from the backend API
    axios.get('/api/flashcards')
      .then((response) => {
        // Assuming the response data is an array of flashcards
        const flashcardDecks = response.data;
        // Set the state with the fetched data
        // ... (update the state as per your original implementation)
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
        // Handle error appropriately
      });
  }, []);

  const flashcardDecks = data['flashcard_decks'];
  
  const [currentDeck, setCurrentDeck] = useState(0);

  const questionArr = flashcardDecks[currentDeck]["flashcards"];

  const [currentCard, setCurrentCard] = useState(0);

  const question = questionArr[currentCard]["question"];
  const answer = questionArr[currentCard]["answer"];

  const [displayText, setDisplayText] = useState(question);

  const [showSubDeck, setShowSubDeck] = useState(false);

  useEffect(() => {
    setDisplayText(questionArr[currentCard]["question"]);
  }, [currentCard, questionArr]);

  function changeDeck(index) {
    setCurrentDeck(index);
    setCurrentCard(0);
    setShowSubDeck(!showSubDeck);
  }

  function changeCard(nav) {
    if (nav === 'back') {
      setCurrentCard((prevCard) => prevCard === 0 ? questionArr.length - 1 : prevCard - 1);
    } else if (nav === 'forwards') {
      setCurrentCard((prevCard) => (prevCard + 1) % questionArr.length);
    }
  }

  function flipCard() {
    setDisplayText(displayText === question ? answer : question)
  }




  return (
    <div className='outer-container'>
      <h1 className='title-text'>decky</h1>
      <div className='MainContainer'>
        <Card clickHandler={flipCard} displayText={displayText} count={currentCard + 1} total={questionArr.length}/>
      </div>
      <ButtonContainer clickHandler={changeCard}/>
      <DeckContainer decks={flashcardDecks} clickHandler={changeDeck}/>
      {showSubDeck && <SubDeck cards={questionArr} />}
    </div>

  );
};

export default MainContainer;

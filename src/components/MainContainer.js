import React, { useEffect, useState } from 'react';
import Card from './Card'
import ButtonContainer from './ButtonContainer';
import DeckContainer from './DeckContainer';
import SubDeck from './SubDeck';

const MainContainer = () => {

  const [data, setData] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showSubDeck, setShowSubDeck] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/decks')
      .then(response => response.json())
      .then(reqData => {
        setData(reqData);
        // Data is updated and available here, so you can log it correctly.
        console.log(reqData);
      })
      .catch(error => console.error(error));
  }, []);

  // Check if data has been loaded and the required properties exist
  const questionArr = data[currentDeck]?.flashcards || [];
  const question = questionArr[currentCard]?.question || '';
  const answer = questionArr[currentCard]?.answer || '';

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
        <Card clickHandler={flipCard} displayText={displayText} count={currentCard + 1} total={questionArr.length} />
      </div>
      <ButtonContainer clickHandler={changeCard} />
      {/* <DeckContainer decks={flashcardDecks} clickHandler={changeDeck} /> */}
      {showSubDeck && <SubDeck cards={questionArr} />}
    </div>

  );
};

export default MainContainer;

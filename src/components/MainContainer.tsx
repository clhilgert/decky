import { useState, useEffect } from 'react';
import data from '../db/db.json';
import Card from './Card';
import ButtonContainer from './ButtonContainer';
import DeckContainer from './DeckContainer';
import SubDeck from './SubDeck';

const MainContainer = () => {
  const flashcardDecks = data['flashcard_decks'];

  const [currentDeck, setCurrentDeck] = useState(0);

  const questionArr = flashcardDecks[currentDeck]['flashcards'];

  const [currentCard, setCurrentCard] = useState(0);

  const question = questionArr[currentCard]['question'];
  const answer = questionArr[currentCard]['answer'];

  const [displayText, setDisplayText] = useState(question);

  const [showSubDeck, setShowSubDeck] = useState(false);

  useEffect(() => {
    setDisplayText(questionArr[currentCard]['question']);
  }, [currentCard, questionArr]);

  function changeDeck(index: number) {
    setCurrentDeck(index);
    setCurrentCard(0);
    setShowSubDeck(!showSubDeck);
  }

  function changeCard(nav: string) {
    if (nav === 'back') {
      setCurrentCard((prevCard: number) =>
        prevCard === 0 ? questionArr.length - 1 : prevCard - 1
      );
    } else if (nav === 'forwards') {
      setCurrentCard((prevCard: number) => (prevCard + 1) % questionArr.length);
    }
  }

  function flipCard() {
    setDisplayText(displayText === question ? answer : question);
  }

  return (
    <div className="outer-container">
      <h1 className="title-text">decky</h1>
      <div className="main-container">
        <Card
          func={flipCard}
          displayText={displayText}
          count={currentCard + 1}
          total={questionArr.length}
        />
        <ButtonContainer func={changeCard} />
        <DeckContainer func={changeDeck} decks={flashcardDecks} />
        {showSubDeck && <SubDeck cards={questionArr} />}
      </div>
    </div>
  );
};

export default MainContainer;

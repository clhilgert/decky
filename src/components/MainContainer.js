import React, { useEffect, useState } from 'react';
import Card from './Card';
import ButtonContainer from './ButtonContainer';
import DeckContainer from './DeckContainer';
import SubDeck from './SubDeck';


const MainContainer = () => {
  const [data, setData] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showSubDeck, setShowSubDeck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questionArr, setQuestionArr] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/decks');
        const resData = await response.json();
        setData(resData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const currentDeckData = data[currentDeck];
      if (currentDeckData) {
        setQuestionArr(currentDeckData.flashcards);
        setCurrentCard(0);
      }
    }
  }, [currentDeck, data]);

  useEffect(() => {
    setDisplayText(questionArr[currentCard]?.question || '');
  }, [currentCard, questionArr]);

  useEffect(() => {
    if (data.length > 0) {
      const currentDeckData = data[currentDeck];
      if (currentDeckData) {
        setQuestionArr(currentDeckData.flashcards);
      }
    }
  }, [data, currentDeck]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function changeDeck(index) {
    setCurrentDeck(index);
    setShowSubDeck(!showSubDeck);
  }

  function changeCard(nav) {
    if (nav === 'back') {
      setCurrentCard((prevCard) => (prevCard === 0 ? questionArr.length - 1 : prevCard - 1));
    } else if (nav === 'forwards') {
      setCurrentCard((prevCard) => (prevCard + 1) % questionArr.length);
    }
  }

  function flipCard() {
    setDisplayText((displayText) =>
      displayText === questionArr[currentCard]?.question ? questionArr[currentCard]?.answer : questionArr[currentCard]?.question
    );
  }

  function addDeck() {
    let count = 0;
    data.forEach(el => {
      if (el.name.includes('New Deck')) count++;
    })
    fetch('http://localhost:5000/api/decks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `New Deck ${count + 1}` })
    })
    .then(response => {
      return response.json();
    })
    .then(newDeck => {
      const newData = [...data];
      newData.push(newDeck);
      setData(newData);
    })
  }

  function deleteDeck(name) {
    fetch('http://localhost:5000/api/decks/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
    .then(response => {
      refreshPage();
      return response.json()
    })
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function addCard(name, question, answer) {
    fetch('http://localhost:5000/api/decks/addcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, question: question, answer: answer }),
    })
      .then((response) => response.json())
      .then((updatedDeck) => {
        setData((prevData) => {
          const updatedData = prevData.map((deck) => {
            if (deck.name === name) {
              return {
                ...deck,
                flashcards: updatedDeck.flashcards,
              };
            }
            return deck;
          });
          return updatedData;
        });
      })
      .catch((error) => {
        console.error('Error adding card:', error);
      });
  }

  function deleteCard(name, question) {
    fetch('http://localhost:5000/api/decks/deletecard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, question: question }),
    })
      .then((response) => response.json())
      .then(() => {
        const updatedData = data.map((deck) => {
          if (deck.name === name) {
            const updatedCards = deck.flashcards.filter((card) => card.question !== question);
            return {
              ...deck,
              flashcards: updatedCards,
            };
          }
          return deck;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error('Error deleting card:', error);
      });
  }
  
  return (
    
    <div className='outer-container'>
      <h1 className='title-text'>decky</h1>
      <div className='MainContainer'>
        <Card clickHandler={flipCard} displayText={displayText} count={currentCard + 1} total={questionArr.length} />
      </div>
      <ButtonContainer clickHandler={changeCard} />
      <DeckContainer decks={data} clickHandler={changeDeck} clickHandlerAlt={addDeck}/>
      {showSubDeck && <SubDeck cards={questionArr} name={data[currentDeck].name} clickHandlerDelete={deleteDeck} clickHandlerAddCard={addCard} clickHandlerDeleteCard={deleteCard}/>}
    </div>
  );
};

export default MainContainer;


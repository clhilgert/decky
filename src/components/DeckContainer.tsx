import Deck from './Deck';

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardDeck {
  deck_name: string;
  flashcards: Flashcard[];
}

interface DeckContainerProps {
  func: (index: number) => void;
  decks: FlashcardDeck[];
}

const DeckContainer = ({ func, decks }: DeckContainerProps) => {
  function handleClick(index: number) {
    func(index);
  }

  return (
    <div className="deck-container">
      {decks.map((deck, index) => (
        <Deck
          key={index}
          name={deck.deck_name}
          onClick={() => handleClick(index)}
          cards={deck.flashcards}
        />
      ))}
    </div>
  );
};

export default DeckContainer;

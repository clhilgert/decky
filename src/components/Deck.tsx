interface Flashcard {
  question: string;
  answer: string;
}

interface DeckProps {
  name: string;
  onClick?: () => void;
  id?: number;
  cards?: Flashcard[];
}

const Deck = ({ name, onClick, cards }: DeckProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div>
      <div className="deck" onClick={handleClick}>
        {name}
      </div>
      {cards && <div>{cards.length} cards</div>}
    </div>
  );
};

export default Deck;

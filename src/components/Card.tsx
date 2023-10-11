interface CardProps {
  func: () => void;
  displayText: string;
  count: number;
  total: number;
}

const Card = ({ func, displayText, count, total }: CardProps) => {
  return (
    <div>
      <div className="card-container">
        <div className="card" onClick={func}>
          {displayText}
        </div>
        <p className="counter-text">
          {count}/{total}
        </p>
      </div>
    </div>
  );
};

export default Card;

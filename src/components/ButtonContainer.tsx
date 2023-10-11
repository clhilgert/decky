interface ButtonContainerProps {
  func: (nav: string) => void;
}

const ButtonContainer = ({ func }: ButtonContainerProps) => {
  return (
    <div className="button-container">
      <button
        className="nav-button"
        id="prev-button"
        onClick={() => func('back')}
      >
        ←
      </button>
      <button
        className="nav-button"
        id="prev-button"
        onClick={() => func('forwards')}
      >
        →
      </button>
    </div>
  );
};

export default ButtonContainer;

import React, { useState } from 'react';
import '../styles.css'

const Card = ({clickHandler, displayText, count, total }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    clickHandler();
  }

  return (
    <div>
      <div className='card-container'>
      <div className={`card ${isFlipped ? 'flip' : ''}`} onClick={handleCardClick}>{displayText}</div>
      <p className='counter-text'>{count}/{total}</p>
      </div>
    </div>
  )
}

export default Card;
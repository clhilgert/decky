import React, { useState } from 'react';


const Card = ({clickHandler, displayText, count, total }) => {

  return (
    <div>
      <div className='card-container'>
      <div className='card' onClick={clickHandler}>{displayText}</div>
      <p className='counter-text'>{count}/{total}</p>
      </div>
    </div>
  )
}

export default Card;
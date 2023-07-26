import React, { useState } from 'react';

const ButtonContainer = ( {clickHandler} ) => {

  return (
    <div className='button-container'>
      <button className='nav-button' id='prev-button' nav='back' onClick={() => clickHandler('back')}>←</button>
      <button className='nav-button' id='next-button' nav='forwards' onClick={() => clickHandler('forwards')}>→</button>
    </div>
  )
}

export default ButtonContainer;
import React from 'react';
import Popup from './Popup';

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <Popup
      isOpen={isOpen}
      name="image"
      onClose={onClose} >
      <img
          src={card.link}
          alt={card.name}
          className="popup__image" />
        <p className="popup__caption">
          {card.name}
        </p>
    </Popup>
  );
}

export default ImagePopup;

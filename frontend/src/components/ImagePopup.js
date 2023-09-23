import React from 'react';

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={
      isOpen
        ? 'popup popup_modal-type_image popup_opened'
        : 'popup popup_modal-type_image'
    }>
      <div className="popup__container popup__container_modal-type_image">
        <img
          src={card.link}
          alt={card.name}
          className="popup__image" />
        <p className="popup__caption">
          {card.name}
        </p>
        <button
          className="popup__close-btn popup__close-btn_modal-type_image"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;

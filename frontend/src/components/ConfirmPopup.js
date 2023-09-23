import React from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';

function ConfirmPopup({
  isOpen,
  onClose,
  onConfirm
})
{
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <Popup
      isOpen={isOpen}
      name="confirm"
      onClose={onClose} >
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={true}
        isBtnEnabled={true} />
    </Popup>
  )
}

export default ConfirmPopup;

import React from 'react';
import Popup from "./Popup";
import success from '../images/tooltip-success.svg';
import fail from '../images/tooltip-fail.svg';

function InfoTooltip({
  isOpen,
  onClose,
  isSuccess
})
{
  return (
    <Popup
      isOpen={isOpen}
      name={isSuccess ? 'success' : 'fail'}
      onClose={onClose} >
      <img
        src={
          isSuccess
            ? success
            : fail
        }
        alt={
          isSuccess
            ? 'Успешно'
            : 'Неудача'
        }
        className={`popup__image popup__image_modal-type_${isSuccess ? 'success' : 'fail'}`} />
      <h2
        className={`popup__title popup__title_modal-type_${isSuccess ? 'success' : 'fail'}`}>
        {
          isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
        }
      </h2>
    </Popup>
  );
}

export default InfoTooltip;

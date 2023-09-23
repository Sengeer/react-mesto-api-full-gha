import React from 'react';

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  isBtnEnabled
})
{
  return (
    <>
      <h2
        className={`popup__title popup__title_modal-type_${name}`}>
        {title}
      </h2>
      <form
        className={`popup__form popup__form_modal-type_${name}`}
        name={`${name}-form`}
        onSubmit={onSubmit}
        noValidate >
        {children}
        <button
          className={
            isValid && isBtnEnabled
              ? `popup__submit-btn popup__submit-btn_modal-type_${name}`
              : `popup__submit-btn popup__submit-btn_modal-type_${name} popup__submit-btn_inactive`
          }
          type="submit"
          disabled={!isBtnEnabled} >
            {buttonText}
        </button>
      </form>
    </>
  );
}

export default PopupWithForm;

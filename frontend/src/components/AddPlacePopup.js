import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading
})
{
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
    isBtnEnabled,
    setIsBtnEnabled
  } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.titleInput,
      link: values.linkInput
    });
  }

  useEffect(() => {
    resetForm();
    setIsBtnEnabled(false);
    setValues({ titleInput: '', linkInput: '' });
  }, [isOpen, resetForm, setValues, setIsBtnEnabled])

  return (
    <Popup
      isOpen={isOpen}
      name="add"
      onClose={onClose} >
      <PopupWithForm
        name="add"
        title="Новое место"
        buttonText={isLoading ? 'Создать...' : 'Создать'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={isValid}
        isBtnEnabled={isBtnEnabled} >
        <input
          type="text"
          className={
            errors.titleInput
              ? 'popup__input popup__input_modal-type_title popup__input_type_error'
              : 'popup__input popup__input_modal-type_title'
          }
          name="titleInput"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={values.titleInput || ''}
          onChange={handleChange}
          required />
        <p className={
          isValid
            ? 'popup__text-error link-input-error'
            : 'popup__text-error link-input-error popup__text-error_active'
        }>
          {errors.titleInput}
        </p>
        <input
          type="url"
          className={
            errors.linkInput
              ? 'popup__input popup__input_modal-type_link popup__input_type_error'
              : 'popup__input popup__input_modal-type_link'
          }
          name="linkInput"
          placeholder="Ссылка на картинку"
          value={values.linkInput || ''}
          onChange={handleChange}
          required />
        <p className={
          isValid
            ? 'popup__text-error link-input-error'
            : 'popup__text-error link-input-error popup__text-error_active'
        }>
          {errors.linkInput}
        </p>
      </PopupWithForm>
    </Popup>
  )
}

export default AddPlacePopup;

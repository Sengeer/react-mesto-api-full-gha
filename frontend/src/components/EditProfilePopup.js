import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading
})
{
  const currentUser = useContext(CurrentUserContext);

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

    onUpdateUser({
      name: values.nameInput,
      about: values.descriptionInput
    });
  }

  useEffect(() => {
    resetForm();
    setIsBtnEnabled(true);
    setValues({
      nameInput: currentUser.name,
      descriptionInput: currentUser.about
    });
  }, [isOpen, currentUser, resetForm, setValues, setIsBtnEnabled])

  return (
    <Popup
      isOpen={isOpen}
      name="edit"
      onClose={onClose} >
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonText={isLoading ? 'Сохранить...' : 'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={isValid}
        isBtnEnabled={isBtnEnabled} >
        <input
          type="text"
          className={
            errors.nameInput
              ? 'popup__input popup__input_modal-type_name popup__input_type_error'
              : 'popup__input popup__input_modal-type_name'
          }
          name="nameInput"
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          value={values.nameInput || ''}
          onChange={handleChange}
          required />
        <p className={
          isValid
            ? 'popup__text-error link-input-error'
            : 'popup__text-error link-input-error popup__text-error_active'
        }>
          {errors.nameInput}
        </p>
        <input
          type="text"
          className={
            errors.descriptionInput
              ? 'popup__input popup__input_modal-type_description popup__input_type_error'
              : 'popup__input popup__input_modal-type_description'
          }
          name="descriptionInput"
          placeholder="Введите описание"
          minLength="2"
          maxLength="200"
          value={values.descriptionInput || ''}
          onChange={handleChange}
          required />
        <p className={
          isValid
            ? 'popup__text-error link-input-error'
            : 'popup__text-error link-input-error popup__text-error_active'
        }>
          {errors.descriptionInput}
        </p>
      </PopupWithForm>
    </Popup>
  )
}

export default EditProfilePopup;

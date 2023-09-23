import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
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

    onUpdateAvatar({
      link: values.avatarInput,
    });
  }

  useEffect(() => {
    resetForm();
    setIsBtnEnabled(false);
    setValues({ avatarInput: '' });
  }, [isOpen, resetForm, setValues, setIsBtnEnabled])

  return (
    <Popup
      isOpen={isOpen}
      name="avatar"
      onClose={onClose} >
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText={isLoading ? 'Сохранить...' : 'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={isValid}
        isBtnEnabled={isBtnEnabled} >
        <input
          type="url"
          className={
            errors.avatarInput
              ? 'popup__input popup__input_modal-type_avatar popup__input_type_error'
              : 'popup__input popup__input_modal-type_avatar'
          }
          name="avatarInput"
          placeholder="Ссылка на картинку"
          value={values.avatarInput || ''}
          onChange={handleChange}
          required />
        <p className={
          isValid
            ? 'popup__text-error link-input-error'
            : 'popup__text-error link-input-error popup__text-error_active'
        }>
          {errors.avatarInput}
        </p>
      </PopupWithForm>
  </Popup>
  )
}

export default EditAvatarPopup;

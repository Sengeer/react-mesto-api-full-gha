import React from 'react';

function AuthWithForm({
  name,
  title,
  buttonText,
  onSubmit,
  onLogin,
  children
})
{
  return (
    <div
      className={`auth auth_type_${name}`} >
      <h2 className={`auth__title auth__title_type_${name}`}>
        {title}
      </h2>
      <form
        className={`auth__form auth__form_type_${name}`}
        name={`${name}-form`}
        onSubmit={onSubmit} >
        {children}
        <button
          className={`auth__submit-btn auth__submit-btn_type_${name}`}
          type="submit" >
            {buttonText}
        </button>
      </form>
      <p
        className={
          name === 'sign-up'
            ? 'auth__sign-in-text auth__sign-in-text_active'
            : 'auth__sign-in-text'
        } >
          Уже зарегистрированы?&nbsp;
        <button
          className="auth__sign-in-btn"
          type="button"
          aria-label="Войти"
          onClick={onLogin}>
            Войти
        </button>
      </p>
    </div>
  );
}

export default AuthWithForm;

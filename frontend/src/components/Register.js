import React, { useState } from 'react';
import Header from './Header';
import AuthWithForm from './AuthWithForm';

function Register({
  onLoginClick,
  onRegisterSubmit
})
{
  const [data, setData] = useState({
    password: '',
    email: ''
  });

  function handleSubmit(e) {
    e.preventDefault();

    onRegisterSubmit(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((valueData) => ({
      ...valueData, [name]: value
    }));
  }

  return (
    <>
      <Header
        btnName="sign-in"
        btnText="Войти"
        onClick={onLoginClick} />
      <AuthWithForm
        name="sign-up"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        onLogin={onLoginClick} >
        <input
          type="email"
          className="auth__input auth__input_type_email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required />
        <input
          type="password"
          className="auth__input auth__input_type_password"
          name="password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          required />
      </AuthWithForm>
    </>
  );
}

export default Register;

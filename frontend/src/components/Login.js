import React, { useState } from 'react';
import Header from './Header';
import AuthWithForm from './AuthWithForm';

function Login({
  onRegisterClick,
  onLoginSubmit
})
{
  const [data, setData] = useState({
    password: '',
    email: ''
  });

  function handleSubmit(e) {
    e.preventDefault();

    onLoginSubmit(data);
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
        btnName="sign-up"
        btnText="Регистрация"
        onClick={onRegisterClick} />
      <AuthWithForm
        name="sign-in"
        title="Вход"
        buttonText="Войти"
        onSubmit={handleSubmit} >
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

export default Login;

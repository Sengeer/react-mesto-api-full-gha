import React, { useState } from 'react';
import logo from '../images/header-logo.svg';

function Header({
  btnName,
  btnText,
  onClick,
  isMobile,
  emailText
})
{
  const [isTopbarOpen, setIsTopbarOpen] = useState(false);

  function handleTopbarOpening() {
    if (isTopbarOpen) {
      setIsTopbarOpen(false);
    } else {
      setIsTopbarOpen(true);
    }
  }


  return (
    <header
      className={
        isTopbarOpen && isMobile && (btnName === 'exit')
          ? 'header header_topbar-active'
          : 'header'
      } >
      <img
        src={logo}
        alt="Лого"
        className="header__logo" />
      <div
        className={
          isMobile && (btnName === 'exit')
            ? isTopbarOpen
                ? 'header__container header__container_topbar'
                : 'header__container header__container_inactive'
            : 'header__container'
        } >
        <p
          className={
            btnName === 'exit'
              ? 'header__email'
              : 'header__email header__email_inactive'
          } >
            {emailText}
        </p>
        <button
          className={
            isTopbarOpen && isMobile && (btnName === 'exit')
              ? 'header__btn header_btn-type_exit'
              : `header__btn header_btn-type_${btnName}`
          }
          type="button"
          aria-label={btnText}
          onClick={onClick}>
            {btnText}
        </button>
      </div>
      <button
        className={
          isMobile && (btnName === 'exit')
            ? isTopbarOpen
              ? 'header__topbar-btn header__topbar-btn_close'
              : 'header__topbar-btn'
            : 'header__topbar-btn header__topbar-btn_inactive'
        }
        type="button"
        aria-label="Боковая панель"
        onClick={handleTopbarOpening} />
    </header>
  );
}

export default Header;

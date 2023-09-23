import { useEffect } from "react";

function Popup({
  isOpen,
  name,
  onClose,
  children
})
{

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={`popup popup_modal-type_${name}${isOpen ? ' popup_opened' : ''}`}
      onMouseDown={handleOverlay} >
      <div
        className={`popup__container popup__container_modal-type_${name}`} >
          {children}
        <button
          className={`popup__close-btn popup__close-btn_modal-type_${name}`}
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;

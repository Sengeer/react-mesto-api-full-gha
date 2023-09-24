import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirm,
  card
})
{
  const currentUser = useContext(CurrentUserContext);

  const isOwner = card.owner === currentUser._id;

  const isLiked = card.likes.some(item => item === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
    onConfirm();
  }

  return (
    <li className="photo-place__element">
      <div
        className="photo-place__image"
        style={{ backgroundImage: `url(${link})` }}
        onClick={handleClick} />
      <div className="photo-place__info">
        <h2 className="photo-place__title">
          {name}
        </h2>
        <button
          className={
            isLiked
              ? 'photo-place__like-btn photo-place__like-btn_active'
              : 'photo-place__like-btn'
          }
          type="button"
          aria-label="Поставить лайк"
          onClick={handleLikeClick} />
        <p className="photo-place__like-counter">
          {likes.length}
        </p>
      </div>
      {
        isOwner && <button
        className="photo-place__delete-btn"
        type="button"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick} />
      }
    </li>
  );
}

export default Card;

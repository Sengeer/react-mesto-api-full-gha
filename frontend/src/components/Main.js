import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onConfirm,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
})
{
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          <button
            className="profile__avatar-btn"
            type="button"
            aria-label="Обновить аватар"
            onClick={onEditAvatar} />
          <h1 className="profile__name">
            {currentUser.name}
          </h1>
          <button
            className="profile__edit-btn"
            type="button"
            aria-label="Редактирование профиля"
            onClick={onEditProfile} />
          <p className="profile__description">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="Добавить изображение"
          onClick={onAddPlace} />
      </section>
      <section className="photo-place">
        <ul className="photo-place__elements">
          {cards.map(card => (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onConfirm={onConfirm}
              card={card} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

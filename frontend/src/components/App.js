import { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRouteElement from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isTooltipPopupSuccess, setIsTooltipPopupSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(auth.getAuthCheck());

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleLoginClick() {
    navigate('/sign-in', { replace: true });
  }

  function handleRegisterClick() {
    navigate('/sign-up', { replace: true });
  }

  function handleExitClick() {
    refreshPage();
    setLoggedIn(false);
    auth.removeAuthCheck();
    navigate('/sign-in', { replace: true });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    setDeleteCardId(card._id);
  }

  function handleUpdateUser(userDataValue) {
    setIsLoading(true);

    api.patchUserInfo({
      name: userDataValue.name,
      description: userDataValue.about
    })
      .then(resMyUserData => {
        setCurrentUser(resMyUserData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatarDataValue) {
    setIsLoading(true);

    api.patchUserInfo({
      avatarLink: avatarDataValue.link
    })
      .then(resMyUserData => {
        setCurrentUser(resMyUserData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardDataValue) {
    setIsLoading(true);

    api.addNewCard({
      name: cardDataValue.name,
      link: cardDataValue.link
    })
      .then((resCard) => {
        setCards([resCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleConfirmSubmit() {
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter((i) => i._id !== deleteCardId));
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleRegisterSubmit(registerData) {
    auth.register(registerData)
      .then(res => {
        if (res.statusCode !== 400) {
          setIsTooltipPopupOpen(true);
          setIsTooltipPopupSuccess(true);
          navigate('/sign-in', { replace: true });
        } else {
          setIsTooltipPopupOpen(true);
          setIsTooltipPopupSuccess(false);
        };
      })
      .catch(e => {
        setIsTooltipPopupOpen(true);
        setIsTooltipPopupSuccess(false);
      });
  }

  function handleLoginSubmit(authData) {
    auth.authorization(authData)
      .then(res => {
        if ((res.statusCode !== 400) && (res.statusCode !== 401)) {
          setLoggedIn(true);
          auth.setAuthCheck(true);
          navigate('/', { replace: true });
          refreshPage();
        } else {
          setIsTooltipPopupOpen(true);
          setIsTooltipPopupSuccess(false);
        };
      })
      .catch(console.error);
  }

  function userCheck() {
    if (isAuthorized) {
      Promise.all([
        auth.identification(),
        api.getInitialCards()
      ])
        .then(([resInfoUser, resCardsData]) => {
          if ((resInfoUser.statusCode !== 400) && (resInfoUser.statusCode !== 401)) {
            setCurrentUser({
              email: resInfoUser.email,
              name: resInfoUser.name,
              about: resInfoUser.about,
              avatar: resInfoUser.avatar,
              _id: resInfoUser._id
            });
            setIsAuthorized(auth.getAuthCheck());
            setCards(resCardsData.reverse());
            setLoggedIn(true);
            navigate('/', { replace: true });
          } else {
            setIsTooltipPopupOpen(true);
            setIsTooltipPopupSuccess(false);
          };
        })
        .catch(console.error);
    } else {
      setLoggedIn(false);
      navigate('/sign-in', { replace: true });
    };
  }

  useEffect(() => {
    const handleWindowWidth = (e) => {
      if (e.target.innerWidth < 899) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    if (window.innerWidth < 899) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    };

    window.addEventListener('resize', handleWindowWidth);
    return () => {
      window.addEventListener('resize', handleWindowWidth);
    };
  }, [])

  useEffect(() => {
    userCheck();
  }, [])

    // if ((currentUser.name === '') && ((loggedIn === undefined) || loggedIn)) {
    //   return
    // }

  return (
    <Routes>
      <Route
        path="*"
        element={
          loggedIn
            ? <Navigate to="/" replace />
            : <Navigate to="/sign-in" replace />
        } />
      <Route path="/" element={
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            btnName="exit"
            btnText="Выйти"
            onClick={handleExitClick}
            isMobile={isMobile}
            emailText={currentUser.email} />
          <ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onConfirm={handleConfirmClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={Footer}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={ImagePopup}
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={EditProfilePopup}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={AddPlacePopup}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={ConfirmPopup}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleConfirmSubmit}
            loggedIn={loggedIn} />
          <ProtectedRouteElement element={EditAvatarPopup}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            loggedIn={loggedIn} />
          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isTooltipPopupSuccess} />
        </CurrentUserContext.Provider>
      } />
      <Route path="/sign-up" element={
        <>
          <Register
            onLoginClick={handleLoginClick}
            onRegisterSubmit={handleRegisterSubmit} />
          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isTooltipPopupSuccess} />
        </>
      } />
      <Route path="/sign-in" element={
        <>
          <Login
            onRegisterClick={handleRegisterClick}
            onLoginSubmit={handleLoginSubmit} />
          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isTooltipPopupSuccess} />
        </>
      } />
    </Routes>
  );
}

export default App;

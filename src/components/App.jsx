import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfile, setEditProfile] = useState(false);
  const [isAddPlace, setOnAddPlace] = useState(false);
  const [isEditAvatar, setOnEditAvatar] = useState(false);
  const [isDeleteCard, setOnDeleteCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleDeleteClick = (cards) => setOnDeleteCard(cards);
  const handleCardClick = (cards) => setSelectedCard(cards);
  const handleEditProfileClick = () => setEditProfile(true);
  const handleAddPlaceClick = () => setOnAddPlace(true);
  const handleEditAvatarClick = () => setOnEditAvatar(true);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getInfoProfile(currentUser)])
      .then(([cardsData, userData]) => {
        setCards([...cards, ...cardsData]);
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id,
        });
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }, []);

  const closeAllPopups = () => {
    setEditProfile(false);
    setOnAddPlace(false);
    setOnEditAvatar(false);
    setOnDeleteCard(false);
    setSelectedCard(false);
  };

  const handleUpdateUser = (data) => {
    api
      .infoProfileEdit({ name: data.name, about: data.about })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };
  const handleUpdateAvatar = (data) => {
    api
      .setAvatar({ avatar: data.avatar })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .postedCard({ name: data.name, link: data.link })
      .then((data) => setCards([data, ...cards]))
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .toggleLike(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  const handleCardDelete = (cardID) => {
    console.log(cardID);
    api
      .deleteCard(cardID)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardID));
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  };

  return (
    <div>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>
          <Main
            setEditProfile={handleEditProfileClick}
            setOnAddPlace={handleAddPlaceClick}
            setOnEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteClick={handleDeleteClick}
          />

          <EditProfilePopup
            isOpen={isEditProfile}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatar}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlace}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isDeleteCard}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isDeleteCard={isDeleteCard}
          />
        </CardContext.Provider>

        <Footer />

        <ImagePopup
          selectedCard={selectedCard}
          isOpened={selectedCard}
          isClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

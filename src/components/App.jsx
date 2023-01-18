import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { set } from "react-hook-form";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfile, setEditProfile] = useState(false);
  const [isAddPlace, setOnAddPlace] = useState(false);
  const [isEditAvatar, setOnEditAvatar] = useState(false);
  const [isDeleteCard, setOnDeleteCard] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

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

  // useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((data) => {
  //       setCards([...cards, ...data]);
  //     })
  //     .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  // }, []);

  // useEffect(() => {
  //   api
  //     .getInfoProfile(currentUser)
  //     .then((res) =>
  //       setCurrentUser({
  //         name: res.name,
  //         about: res.about,
  //         avatar: res.avatar,
  //         id: res._id,
  //       })
  //     )
  //     .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  // }, []);

  const closeAllPopups = () => {
    setEditProfile(false);
    setOnAddPlace(false);
    setOnEditAvatar(false);
    setOnDeleteCard(false);
    setSelectedCard(false);
  };

  const [selectedCard, setSelectedCard] = useState(false);

  const handleCardClick = (cards) => setSelectedCard(cards);
  const handleEditProfileClick = () => setEditProfile(true);
  const handleAddPlaceClick = () => setOnAddPlace(true);
  const handleEditAvatarClick = () => setOnEditAvatar(true);

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
    console.log(data);
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

  const handleCardDelete = (card) => {
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card.id));
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
            setOnDeleteCard={setOnDeleteCard}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
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

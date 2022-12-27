import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [isEditProfile, setEditProfile] = useState(false);
  const [isAddPlace, setOnAddPlace] = useState(false);
  const [isEditAvatar, setOnEditAvatar] = useState(false);
  const [isDeleteCard, setOnDeleteCard] = useState(false);

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

  return (
    <div>
      <Header />
      <Main
        setEditProfile={handleEditProfileClick}
        setOnAddPlace={handleAddPlaceClick}
        setOnEditAvatar={handleEditAvatarClick}
        setOnDeleteCard={setOnDeleteCard}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        isOpened={isEditProfile}
        onClose={closeAllPopups}
        btnText="Изменить"
      >
        <label>
          <input
            required
            type="text"
            className={`popup__input`}
            minLength="2"
            maxLength="40"
            placeholder="Ваше имя"
          ></input>
          <span id="nameInput-error" className="popup__error">
            Вы пропустили это поле.
          </span>
          <input
            required
            type="text"
            className={`popup__input`}
            minLength="2"
            maxLength="200"
            placeholder="Ваш род деятельности"
          ></input>
          <span id="jobInput-error" className="popup__error">
            Вы пропустили это поле.
          </span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        isOpened={isAddPlace}
        onClose={closeAllPopups}
        btnText="Добавить"
      >
        <input
          required
          type="text"
          className={`popup__input`}
          minLength="2"
          maxLength="40"
          placeholder="Название"
        ></input>
        <span id="nameInput-error" className="popup__error">
          Вы пропустили это поле.
        </span>
        <input
          required
          type="text"
          className={`popup__input`}
          minLength="2"
          maxLength="200"
          placeholder="Ссылка на картинку"
        ></input>
        <span id="jobInput-error" className="popup__error">
          Введите адрес сайта.
        </span>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить Аватар"
        isOpened={isEditAvatar}
        onClose={closeAllPopups}
        btnText="Обновить"
        name="-avatar"
      >
        <input
          required
          type="text"
          className={`popup__input`}
          minLength="2"
          maxLength="200"
          placeholder="Ссылка на картинку"
        ></input>
        <span id="jobInput-error" className="popup__error">
          Введите ссылку на фото.
        </span>
      </PopupWithForm>

      <PopupWithForm
        title="Вы уверены?"
        isOpened={isDeleteCard}
        onClose={closeAllPopups}
        btnText="Да"
        name="-delete"
      ></PopupWithForm>

      <ImagePopup
        selectedCard={selectedCard}
        isOpened={selectedCard}
        isClose={closeAllPopups}
      />
    </div>
  );
}

export default App;

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  const [onEditProfile, setEditProfile] = useState(false)
  const [onAddPlace, setOnAddPlace] = useState(false)
  const [onEditAvatar, setOnEditAvatar] = useState(false)
  const [onDeleteCard, setOnDeleteCard] = useState(false)

  const closeAllPopups = () => {
    setEditProfile(false)
    setOnAddPlace(false)
    setOnEditAvatar(false)
    setOnDeleteCard(false)
    setSelectedCard(false)
  }

  const [selectedCard, setSelectedCard] = useState(false);

  const handleCardClick = (cards) => setSelectedCard(cards)

  return (
    <div>
      <Header />
      <Main
        setEditProfile={setEditProfile}
        setOnAddPlace={setOnAddPlace}
        setOnEditAvatar={setOnEditAvatar}
        setOnDeleteCard={setOnDeleteCard}
        onCardClick={handleCardClick}
        userName={userName}
        setUserName={setUserName}
        userDescription={userDescription}
        setUserDescription={setUserDescription}
        userAvatar={userAvatar}
        setUserAvatar={setUserAvatar}
        cards={cards}
        setCards={setCards}
      />
      <Footer />

      <PopupWithForm
        title="Редактировать профиль"
        isOpened={onEditProfile}
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
        isOpened={onAddPlace}
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
        isOpened={onEditAvatar}
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
        isOpened={onDeleteCard}
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

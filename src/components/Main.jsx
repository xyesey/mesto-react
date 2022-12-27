import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main({
  setEditProfile,
  setOnAddPlace,
  setOnEditAvatar,
  setOnDeleteCard,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInfoProfile(userName, userDescription, userAvatar).then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    })
    .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
  }, []);

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(
        data.map((card) => ({
          id: card._id,
          name: card.name,
          link: card.link,
          likes: card.likes,
        }))
      );
    })
    .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            onClick={() => setOnEditAvatar(true)}
            src={userAvatar}
            className="profile__avatar"
            alt="Avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__info-title">{userName}</h1>
            <button
              onClick={() => setEditProfile(true)}
              className="profile__edit-button"
              aria-label="Редактировать"
              type="button"
            ></button>
          </div>
          <p className="profile__info-subtitle">{userDescription}</p>
        </div>
        <button
          onClick={() => setOnAddPlace(true)}
          className="profile__add-button"
          aria-label="Добавить карточку"
          type="button"
        ></button>
      </section>

      <section className="elements">
        {cards.map(({ id, ...card }) => {
          return (
            <Card
              key={`cardID ${id}`}
              {...card}
              onClick={() => setOnDeleteCard(true)}
              onCardClick={onCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;

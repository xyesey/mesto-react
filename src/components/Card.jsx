function Card({ name, link, likes, onClick, onCardClick }) {

  function handleClick() {
    onCardClick({link, name})
  }
  
  return (
    <>
      <article className="element">
        <button
          aria-label="Delete"
          type="button"
          className="element__btn-delete"
          onClick={onClick}
        ></button>
        <img
          src={link}
          onClick={handleClick}
          className="element__image"
          alt="Photo"
        />
        <div className="element__position">
          <h2 className="element__title">{name}</h2>
          <div className="element__section">
            <button className="element__button-like" type="button"></button>
            <p className="element__like-counter">{likes.length}</p>
          </div>
        </div>
      </article>
    </>
  );
}

export default Card;

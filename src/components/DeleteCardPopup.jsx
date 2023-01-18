import { useContext } from "react";
import { CardContext } from "../contexts/CardContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard }) {
  const userId = useContext(CurrentUserContext);
  const card = useContext(CardContext)
  console.log(card)

  const handleSubmit = (e) => {
    e.preventDefault();

    onDeleteCard(card);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      isOpened={isOpen}
      onClose={onClose}
      onChange={handleSubmit}
      btnText="Да"
      name="-delete"
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;

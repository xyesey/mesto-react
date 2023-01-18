import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const nameValue = getValues("placeName");
  const urlValue = getValues("url");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddCard({
      name: nameValue,
      link: urlValue,
    });
    console.log(urlValue)
  };
  

  return (
    <PopupWithForm
      title="Новое место"
      isOpened={isOpen}
      onClose={onClose}
      onChange={(e) => handleSubmit(e)}
      btnText="Добавить"
    >
      <input
        // required
        type="text"
        className={`popup__input`}
        // minLength="2"
        // maxLength="40"
        placeholder="Название"
        {...register("placeName", {
          required: "Поле обязательно к заполнению.",
          minLength: {
            value: 3,
            message: "Минимум 3 символа.",
          },
        })}
      ></input>
      <span className="popup__error_visible">{errors?.placeName?.message}</span>
      <input
        // required
        type="text"
        className={`popup__input`}
        // minLength="2"
        // maxLength="200"
        placeholder="Ссылка на картинку"
        {...register("url", {
          required: "Поле обязательно к заполнению.",
          minLength: {
            value: 7,
            message: "Минимум 7 символов.",
          },
        })}
      ></input>
      <span className="popup__error_visible">{errors?.url?.message}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

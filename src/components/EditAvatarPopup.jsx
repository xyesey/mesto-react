import { useRef } from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // const inputRef = useRef(null);

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: urlValue,
    });
    console.log(urlValue)
  };

  const urlValue = getValues("url");

  return (
    <PopupWithForm
      title="Обновить Аватар"
      isOpened={isOpen}
      onClose={onClose}
      onChange={handleSubmit}
      btnText="Обновить"
      name="-avatar"
    >
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
            value: 5,
            message: "Минимум 5 символoв.",
          },
        })}
      ></input>
      <span className="popup__error_visible">{errors?.url?.message}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import useInput from "../hooks/useInput";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: name.value,
      about: about.value,
    });
  };

  const name = useInput("", { isEmpty: true, minLength: 3 });
  const about = useInput("", { isEmpty: true, minLength: 4 });

  return (
    <PopupWithForm
      title="Редактировать профиль"
      isOpened={isOpen}
      onClose={onClose}
      onChange={(e) => handleSubmit(e)}
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
          value={name.value}
          onChange={(e) => name.onChange(e)}
          onBlur={(e) => name.onBlur(e)}
        ></input>
        <span id="nameInput-error" className="popup__error_visible">
          {name.isDirty && name.isEmpty
            ? "Это поле не может быть пустым."
            : name.isDirty && name.minLengthError
            ? "Некорректная длина"
            : ""}
        </span>
        <input
          required
          type="text"
          className={`popup__input`}
          minLength="2"
          maxLength="200"
          placeholder="Ваш род деятельности"
          value={about.value}
          onChange={(e) => about.onChange(e)}
          onBlur={(e) => about.onBlur(e)}
        ></input>
        <span id="jobInput-error" className="popup__error_visible">
          {about.isDirty && about.isEmpty
            ? "Это поле не может быть пустым."
            : about.isDirty && about.minLengthError
            ? "Некорректная длина."
            : ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

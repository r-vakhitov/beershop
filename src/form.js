import { isValid, regExp } from "./utils";
import { Database } from "./database";

const form = document.querySelector(".form");
const submitBtn = form.querySelector(".form__submit");
const inputTel = form.querySelector(".form__number");
const inputEmail = form.querySelector(".form__email");
const inputPassword = form.querySelector(".form__pass");

export function formIsValid() {
  return (
    isValid(inputTel.value.trim(), regExp.tel) &&
    isValid(inputEmail.value, regExp.email) &&
    isValid(inputPassword.value, regExp.password)
  );
}

export function submitFormHandler(evt) {
  evt.preventDefault();
  if (formIsValid) {
    const user = {
      tel: inputTel.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };

    submitBtn.disabled = true;

    Database.create(user).then(() => {
      formInputs.forEach((input) => (input.value = ""));
      // Здесь надо будет убрать класс невалидности

      submitBtn.disabled = false;
    });
  }
}

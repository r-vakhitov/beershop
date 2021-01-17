import { isValid, regExp } from "./utils";
import { Database } from "./database";

const form = document.querySelector(".form");
const formInputs = form.querySelectorAll("input");
const formLabels = form.querySelectorAll(".form__label");
const submitBtn = form.querySelector(".form__submit");
const inputTel = form.querySelector(".form__number");
const inputEmail = form.querySelector(".form__email");
const inputPassword = form.querySelector(".form__pass");

const URL = "https://beershop-c42a5-default-rtdb.firebaseio.com/users.json";

export function formIsValid() {
  if (isValid(inputTel.value.trim(), regExp.tel)) {
    formLabels.item(0).classList.add("form__label-valid");
  } else {
    formLabels.item(0).classList.remove("form__label-valid");
  }

  if (isValid(inputEmail.value, regExp.email)) {
    formLabels.item(1).classList.add("form__label-valid");
  } else {
    formLabels.item(1).classList.remove("form__label-valid");
  }

  if (isValid(inputPassword.value, regExp.password)) {
    formLabels.item(2).classList.add("form__label-valid");
  } else {
    formLabels.item(2).classList.remove("form__label-valid");
  }

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

    Database.create(user, URL).then(() => {
      formInputs.forEach((input) => (input.value = ""));
      formLabels.forEach((label) => {
        label.classList.remove("form__label-valid");
      });
      submitBtn.disabled = true;
    });
  }
}

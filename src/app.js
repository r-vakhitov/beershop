import { isValid, regExp } from "./utils";
import { Database } from "./database";
import { render } from "./render";
import { paginate } from "./pagination";

const form = document.querySelector(".form");
const inputTel = form.querySelector(".form__number");
const inputEmail = form.querySelector(".form__email");
const inputPassword = form.querySelector(".form__pass");
const submitBtn = form.querySelector(".form__submit");
const formInputs = form.querySelectorAll("input");
const catalog = document.querySelector(".catalog");
const nextPage = document.querySelector(".pagination__forward");
const prevPage = document.querySelector(".pagination__back");

const ITEMS_ON_PAGE = 9;
const URL = "https://beershop-c42a5-default-rtdb.firebaseio.com/catalog.json";
let currentPage = 1;

function formIsValid() {
  return (
    isValid(inputTel.value.trim(), regExp.tel) &&
    isValid(inputEmail.value, regExp.email) &&
    isValid(inputPassword.value, regExp.password)
  );
}

form.addEventListener("submit", submitFormHandler);
formInputs.forEach((input) =>
  input.addEventListener("input", () => {
    submitBtn.disabled = !formIsValid();
  })
);

function submitFormHandler(evt) {
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

function renderPage(url, page, items){
  Database.getCatalog(
    url
  ).then((data) => {
    return paginate(data, page, items)
  })
  .then((arr) => {
    render(arr, catalog);
  });
}

nextPage.addEventListener('click', ()=>{
  currentPage++;
  renderPage(URL, currentPage, ITEMS_ON_PAGE)
});

prevPage.addEventListener('click', ()=>{
  currentPage--;
  renderPage(URL, currentPage, ITEMS_ON_PAGE)
});

renderPage(URL, currentPage, ITEMS_ON_PAGE);
import { renderPage } from "./render";
import { formIsValid, submitFormHandler } from "./form";
import { sortByValue } from "./utils";

const popUp = document.querySelector(".form-wrapper");
const form = popUp.querySelector(".form");
const formCloseBtns = form.querySelectorAll(".form__close");
const submitBtn = form.querySelector(".form__submit");
const formInputs = form.querySelectorAll("input");

const nextPage = document.querySelector(".pagination__forward");
const prevPage = document.querySelector(".pagination__back");
const sortBtnAbvAsc = document.querySelector(".sort__button--abv-asc");
const sortBtnAbvDesc = document.querySelector(".sort__button--abv-desc");
const sortBtnIbuAsc = document.querySelector(".sort__button--ibu-asc");
const sortBtnIbuDesc = document.querySelector(".sort__button--ibu-desc");
const feedBackBtn = document.querySelector(".feedback");

let currentPage = 1;
let sortFunc = null;

formCloseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    popUp.style.display = "none";
  });
});

feedBackBtn.addEventListener("click", () => {
  popUp.style.display = "block";
});

form.addEventListener("submit", submitFormHandler);
formInputs.forEach((input) =>
  input.addEventListener("input", () => {
    submitBtn.disabled = !formIsValid();
  })
);

const pageHandler = (increment) => {
  currentPage += increment;
  renderPage(currentPage, sortFunc);
};

nextPage.addEventListener("click", () => {
  pageHandler(1);
});

prevPage.addEventListener("click", () => {
  pageHandler(-1);
});

sortBtnAbvAsc.addEventListener("click", () => {
  sortFunc = sortByValue.bind(null, "abv", "asc");
  renderPage(currentPage, sortFunc);
});

sortBtnAbvDesc.addEventListener("click", () => {
  sortFunc = sortByValue.bind(null, "abv", "desc");
  renderPage(currentPage, sortFunc);
});

sortBtnIbuAsc.addEventListener("click", () => {
  sortFunc = sortByValue.bind(null, "ibu", "asc");
  renderPage(currentPage, sortFunc);
});

sortBtnIbuDesc.addEventListener("click", () => {
  sortFunc = sortByValue.bind(null, "ibu", "desc");
  renderPage(currentPage, sortFunc);
});

renderPage(currentPage);

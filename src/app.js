import { renderPage } from "./render";
import { formIsValid, submitFormHandler } from "./form";
import { sortByValueAsc, sortByValueDesc } from "./utils";

const form = document.querySelector(".form");

const submitBtn = form.querySelector(".form__submit");
const formInputs = form.querySelectorAll("input");
const nextPage = document.querySelector(".pagination__forward");
const prevPage = document.querySelector(".pagination__back");
const sortBtnAbvAsc = document.querySelector(".sort__button--abv-asc");
const sortBtnAbvDesc = document.querySelector(".sort__button--abv-desc");
const sortBtnIbuAsc = document.querySelector(".sort__button--ibu-asc");
const sortBtnIbuDesc = document.querySelector(".sort__button--ibu-desc");

let currentPage = 1;
let sortFunc = null;

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
  sortFunc = sortByValueAsc.bind(null, "abv");
  renderPage(currentPage, sortFunc);
});

sortBtnAbvDesc.addEventListener("click", () => {
  sortFunc = sortByValueDesc.bind(null, "abv");
  renderPage(currentPage, sortFunc);
});

sortBtnIbuAsc.addEventListener("click", () => {
  sortFunc = sortByValueAsc.bind(null, "ibu");
  renderPage(currentPage, sortFunc);
});

sortBtnIbuDesc.addEventListener("click", () => {
  sortFunc = sortByValueDesc.bind(null, "ibu");
  renderPage(currentPage, sortFunc);
});

renderPage(currentPage);

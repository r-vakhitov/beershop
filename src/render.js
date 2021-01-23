import { paginate } from "./pagination";
import { Database } from "./database";
const URL = "https://beershop-c42a5-default-rtdb.firebaseio.com/catalog.json";
const ITEMS_ON_PAGE = 9;

const catalog = document.querySelector(".catalog");
const favBlock = document.querySelector(".favourites");
const cleanFavsBtn = document.querySelector(".favourite__clean-btn");
let removeBtns = [];
let favourites = getFavsFromLocalStorage();

cleanFavsBtn.addEventListener("click", () => {
  favourites = [];
  refreshLocalStorage();
  renderFav();
});

function isInFavCheck(nodeList) {
  nodeList.forEach((node) => {
    if (favourites.find((el) => el.id === node.id)) {
      node.innerText = "Добавлено";
    } else {
      node.innerText = "В избранное";
    }
  });
}

function getFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("favourites") || "[]");
}

function refreshLocalStorage() {
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

function render(arr) {
  const resultHtml = `<ul class="catalog__list">${arr
    .map((el) => {
      return `
            <li class="item">
                <img class="item__image" src=${el.image_url} width=100>
                <div class="item__description">
                  <span class="item__name">${el.name}</span>
                  <div class="item__text-wrapper">
                    <span>Поставщик:</span> 
                    <span>${el.contributed_by}</span>
                  </div>
                  <div class="item__text-wrapper">
                    <span>Впервые сварено:</span> 
                    <span> ${el.first_brewed}</span>
                  </div>
                  <div class="item__text-wrapper">
                    <span>Горечь IBU:</span> 
                    <span> ${el.ibu ? el.ibu : "Неизвестно"}</span>
                  </div>
                  <div class="item__text-wrapper">
                    <span>Алкоголь:</span> 
                    <span> ${el.abv}%</span>
                  </div>
                  <button id=${
                    el.id
                  } type="button" class="item__fav-btn">В избранное</button>
                </div>
            </li>
            `;
    })
    .join("")}</ul>`;
  catalog.innerHTML = resultHtml;
  renderFav();
}

export function renderFav(addToFavBtns) {
  const resultHtml = `
  <ul class="favourites__list">${favourites
    .map((el) => {
      return `
            <li class="favourites__item">
            <span>${el.name}</span>
            <button id="${el.id}" class="favourites__remove-btn">x</button>
            </li>
            `;
    })
    .join("")}</ul>`;
  favBlock.innerHTML = resultHtml;
  removeBtns = favBlock.querySelectorAll("button");
  removeBtns.forEach((el) => {
    el.addEventListener("click", (evt) => {
      const buttonId = evt.target.id;
      favourites = favourites.filter((el) => el.id !== buttonId);
      refreshLocalStorage();
      isInFavCheck(addToFavBtns);
      renderFav(addToFavBtns);
    });
  });
}

export function renderPage(page, sortHandler = null) {
  Database.getCatalog(URL).then((data) => {
    const sortedData = sortHandler ? sortHandler(data) : data;
    const paginatedCatalog = paginate(sortedData, page, ITEMS_ON_PAGE);
    render(paginatedCatalog, catalog);
    const addToFavBtns = document.querySelectorAll(".item__fav-btn");
    addHandlerToFavBtns(addToFavBtns);
    isInFavCheck(addToFavBtns);
    renderFav(addToFavBtns);
  });
}

const favHandler = (event, addToFavBtns) => {
  const beerCard = event.path[1];
  const beer = {
    name: beerCard.querySelector("span").innerText,
    id: event.target.id,
  };
  if (!favourites.find((obj) => obj.id === beer.id)) {
    favourites.push(beer);
    refreshLocalStorage();
    renderFav(addToFavBtns);
  }
};

function addHandlerToFavBtns(addToFavBtns) {
  addToFavBtns.forEach((el) => {
    el.addEventListener("click", (evt) => {
      favHandler(evt, addToFavBtns);
      isInFavCheck(addToFavBtns);
    });
  });
}

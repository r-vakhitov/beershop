import { paginate } from "./pagination";
import { Database } from "./database";
const URL = "https://beershop-c42a5-default-rtdb.firebaseio.com/catalog.json";
const ITEMS_ON_PAGE = 9;
let favourites = [];

const catalog = document.querySelector(".catalog");
const favBlock = document.querySelector(".favourites");
let removeBtns = [];

function isInFavCheck(nodeList) {
  nodeList.forEach((node) => {
    if (favourites.find((el) => el.id === node.id)) {
      node.innerText = "Добавлено";
    } else {
      node.innerText = "В избранное";
    }
  });
}

function render(arr) {
  const resultHtml = `<ul class="catalog__list">${arr
    .map((el) => {
      return `
            <li>
                <img src=${el.image_url} width=100>
                <span>${el.name}</span>
                <p>
                    <span>Поставщик: ${el.contributed_by}</span>
                    <span>Впервые сварено: ${el.first_brewed}</span>
                    <span>Горечь IBU: ${el.ibu ? el.ibu : "Неизвестно"}</span>
                    <span>Алкоголь: ${el.abv}%</span>
                </p>
                <button id=${
                  el.id
                } type="button" class="item__fav-btn">В избранное</button>
            </li>
            `;
    })
    .join("")}</ul>`;
  catalog.innerHTML = resultHtml;
  renderFav();
}

function renderFav(addToFavBtns) {
  const resultHtml = `
  <ul class="favourites__list">${favourites
    .map((el) => {
      return `
            <li>
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
      isInFavCheck(addToFavBtns);
      renderFav(addToFavBtns);
    });
  });
}

export function renderPage(page, sortHandler = null) {
  Database.getCatalog(URL)
    .then((data) => {
      const sortedData = sortHandler ? sortHandler(data) : data;
      return paginate(sortedData, page, ITEMS_ON_PAGE);
    })
    .then((arr) => {
      render(arr, catalog);
      const addToFavBtns = document.querySelectorAll(".item__fav-btn");
      fav(addToFavBtns);
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
    renderFav(addToFavBtns);
  }
};

function fav(addToFavBtns) {
  addToFavBtns.forEach((el) => {
    el.addEventListener("click", (evt) => {
      favHandler(evt, addToFavBtns);
      isInFavCheck(addToFavBtns);
    });
  });
}

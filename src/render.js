import { paginate } from "./pagination";
import { Database } from "./database";
const URL = "https://beershop-c42a5-default-rtdb.firebaseio.com/catalog.json";
const ITEMS_ON_PAGE = 9;

const catalog = document.querySelector(".catalog");

function render(arr, node) {
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
            </li>
            `;
    })
    .join("")}</ul>`;
  node.innerHTML = resultHtml;
}

export function renderPage(page, sortHandler = null) {
  Database.getCatalog(URL)
    .then((data) => {
      const sortedData = sortHandler ? sortHandler(data) : data;
      return paginate(sortedData, page, ITEMS_ON_PAGE);
    })
    .then((arr) => {
      render(arr, catalog);
    });
}

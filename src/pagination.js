const nextPage = document.querySelector(".pagination__forward");
const prevPage = document.querySelector(".pagination__back");
const pageCount = document.querySelector(".pagination__current");

export function paginate(arr, currentPage, itemsCount) {
  let nodes = null;
  if (arr.length) {
    let start = (currentPage - 1) * itemsCount;
    let end = start + itemsCount;
    nodes = arr.slice(start, end);
  }
  pageClassToggle(arr, currentPage, itemsCount);
  return nodes;
}

function pageClassToggle(renderList, pageNumber, itemsOnPage) {
  const isLastPage = +pageNumber === Math.ceil(renderList.length / itemsOnPage);
  const isFirstPage = +pageNumber === 1;
  pageCount.innerHTML = `Станица №${pageNumber} из ${Math.ceil(
    renderList.length / itemsOnPage
  )}`;
  if (isFirstPage) {
    prevPage.classList.add("disabled-link");
  } else {
    prevPage.classList.remove("disabled-link");
  }
  if (isLastPage) {
    nextPage.classList.add("disabled-link");
  } else {
    nextPage.classList.remove("disabled-link");
  }
}

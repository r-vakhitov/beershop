export function render(arr, node) {
  const resultHtml = `<ul>${arr
    .map((el) => {
      return `
            <li>
                <img src=${el.image_url}>
                <span>${el.name}</span>
                <p>
                    <span>Поставщик: ${el.contributed_by}</span>
                    <span>Впервые сварено: ${el.first_brewed}</span>
                    <span>Горечь IBU: ${el.ibu}</span>
                    <span>Алкоголь: ${el.abv}%</span>
                </p>
            </li>
            `;
    })
    .join()}</ul>`;
  node.innerHTML = resultHtml;
}

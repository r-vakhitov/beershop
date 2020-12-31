export function paginate(arr, currentPage, itemsCount) {
    let nodes = null;
    if (arr.length) {
        let start = (currentPage-1)*itemsCount;
        let end = start + itemsCount;
        nodes = arr.slice(start, end);
    }
    return nodes;
}
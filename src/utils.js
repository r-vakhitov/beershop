export function isValid(value, regExp) {
  return regExp.test(value);
}

export const regExp = {
  tel: /7[0-9]{10}/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  password: /\S{6,}/,
};

export function sortByValueAsc(prop, objects) {
  const objectsCopy = JSON.parse(JSON.stringify(objects));
  objectsCopy.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]));
  return objectsCopy;
}

export function sortByValueDesc(prop, objects) {
  const objectsCopy = JSON.parse(JSON.stringify(objects));
  objectsCopy.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));
  return objectsCopy;
}

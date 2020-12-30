export function isValid(value, regExp) {
  return regExp.test(value);
}

export const regExp = {
  tel: /7[0-9]{10}/,
  email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
  password: /\S{6,}/,
};

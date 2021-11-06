export const sum = (array: Array<number>): number => {
  return array.reduce((res, x) => res + x);
}

export const multiply = (array: Array<number>): number => {
  return array.reduce((res, x) => res * x);
}

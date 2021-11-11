export const sum = (array: Array<number>): number => {
  return array.reduce((res, x) => res + x);
}

export const multiply = (array: Array<number>): number => {
  return array.reduce((res, x) => res * x);
}

export const unique = <T>(array: Array<T>) => {
  return array.reduce((res, x) => {
    if (!res.includes(x)) {
      res.push(x);
    }

    return res;
  }, []);
}
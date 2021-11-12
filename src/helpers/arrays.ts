export const sum = (array: Array<number>): number => {
  return array.reduce((res, x) => res + x, 0);
}

export const multiply = (array: Array<number>): number => {
  if (!array.length) {
    return 0;
  }

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
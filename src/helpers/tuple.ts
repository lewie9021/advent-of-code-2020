export type Tuple<A, B = A> = [A, B];

export const multiply = ([x, y]: Tuple<number>) => x * y;

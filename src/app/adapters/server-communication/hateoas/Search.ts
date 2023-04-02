export type Search<T, K extends keyof T = keyof T> = {
  rel: string;
  key: K;
  value: string | number;
};

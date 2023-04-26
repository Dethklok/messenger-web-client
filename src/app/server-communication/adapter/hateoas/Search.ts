export type Search<T> = T extends { [K in infer U]: any }
  ? U extends keyof T
    ? {
        key: U;
        value: T[U];
        rel: string;
      }
    : never
  : never;

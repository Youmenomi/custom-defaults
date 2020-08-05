export type Dictionary<T = any> = {
  [key: string]: T;
};

export type DuplicatePropertyNames<TObject, TSource> = keyof TObject &
  keyof TSource;
export type DPNames<TObject, TSource> = DuplicatePropertyNames<
  TObject,
  TSource
>;

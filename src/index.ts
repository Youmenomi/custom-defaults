import { DPNames, Dictionary } from './helper';

type CustomizerReturnType<
  TObject,
  TSource,
  TDuplicateNames extends DPNames<TObject, TSource> = DPNames<TObject, TSource>
> = {
  [K in TDuplicateNames]: ReturnType<CustomizerType<TObject[K], TSource[K]>>;
};

type UnionObject<
  TObject,
  TSource,
  TDuplicateNames extends DPNames<TObject, TSource> = DPNames<TObject, TSource>
> = Omit<TObject, TDuplicateNames> &
  Omit<TSource, TDuplicateNames> &
  CustomizerReturnType<TObject, TSource>;

type CustomizerType<TObjValue, TSrcValue> = (
  objValue: TObjValue,
  srcValue: TSrcValue
) => TObjValue | TSrcValue;

export function customDefaults<
  TObject extends Dictionary | TSource | undefined,
  TSource extends Dictionary
>(
  customizer: CustomizerType<TObject, TSource>,
  object: TObject,
  source: TSource
) {
  if (!object || object === source) return source;

  const temp = object as { [key in keyof TSource]: any };
  (Object.keys(source) as (keyof TSource)[]).forEach((key) => {
    temp[key] = customizer(temp[key], source[key]);
  });
  return object as UnionObject<TObject, TSource>;
}

export function NullableCustomizer(objValue: any, srcValue: any) {
  return objValue === undefined ? srcValue : objValue;
}

export function NonNullableCustomizer(objValue: any, srcValue: any) {
  return objValue === undefined || objValue === null ? srcValue : objValue;
}

type NullableCustomizerType<TObjValue, TSrcValue> = (
  objValue: TObjValue,
  srcValue: TSrcValue
) => TObjValue extends undefined ? TSrcValue : TObjValue;
type NullableCustomizerReturnType<
  TObject,
  TSource,
  TDuplicateNames extends DPNames<TObject, TSource> = DPNames<TObject, TSource>
> = {
  [K in TDuplicateNames]: ReturnType<
    NullableCustomizerType<TObject[K], TSource[K]>
  >;
};
type NullableUnionObject<
  TObject,
  TSource,
  TDuplicateNames extends DPNames<TObject, TSource> = DPNames<TObject, TSource>
> = Omit<TObject, TDuplicateNames> &
  Omit<TSource, TDuplicateNames> &
  NullableCustomizerReturnType<TObject, TSource>;

type NonNullableCustomizerType<TObjValue, TSrcValue> = (
  objValue: TObjValue,
  srcValue: TSrcValue
) => TObjValue extends undefined | null ? TSrcValue : TObjValue;
type NonNullableCustomizerReturnType<
  TObject,
  TSource,
  TDuplicateNames extends DPNames<TObject, TSource> = DPNames<TObject, TSource>
> = {
  [K in TDuplicateNames]: ReturnType<
    NonNullableCustomizerType<TObject[K], TSource[K]>
  >;
};
type NonNullableUnionObject<
  TObject,
  TSource,
  TDuplicateNames extends DPNames<TObject, TSource> = DPNames<TObject, TSource>
> = Omit<TObject, TDuplicateNames> &
  Omit<TSource, TDuplicateNames> &
  NonNullableCustomizerReturnType<TObject, TSource>;

export function defaults<
  TObject extends Dictionary | undefined,
  TSource extends Dictionary,
  TNullable extends true | undefined
>(
  object: TObject,
  source: TSource,
  nullable?: TNullable
): NonNullable<TObject> extends never
  ? TSource
  : Extract<TObject, undefined | null> extends never
  ? NullableUnionObject<TObject, TSource>
  :
      | NullableUnionObject<NonNullable<TObject>, TSource>
      | (TSource &
          {
            [key in keyof Omit<
              NonNullable<TObject>,
              DPNames<NonNullable<TObject>, TSource>
            >]: undefined;
          });
export function defaults<
  TObject extends Dictionary | undefined,
  TSource extends Dictionary,
  TNullable extends false
>(
  object: TObject,
  source: TSource,
  nullable: TNullable
): NonNullable<TObject> extends never
  ? TSource
  : Extract<TObject, undefined | null> extends never
  ? NonNullableUnionObject<TObject, TSource>
  :
      | NonNullableUnionObject<NonNullable<TObject>, TSource>
      | (TSource &
          {
            [key in keyof Omit<
              NonNullable<TObject>,
              DPNames<NonNullable<TObject>, TSource>
            >]: undefined;
          });
export function defaults(
  object: Dictionary | undefined,
  source: Dictionary,
  nullable = true
) {
  return customDefaults(
    nullable ? NullableCustomizer : NonNullableCustomizer,
    object,
    source
  );
}

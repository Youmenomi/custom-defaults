import { DPNames, Dictionary } from '../types/helper';

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
  TObject extends Dictionary,
  TSource extends Dictionary
>(
  customizer: CustomizerType<TObject, TSource>,
  object: TObject,
  source: TSource
) {
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
  TObject extends Dictionary,
  TSource extends Dictionary
>(object: TObject, source: TSource): NullableUnionObject<TObject, TSource>;
export function defaults<
  TObject extends Dictionary,
  TSource extends Dictionary,
  TNullable extends boolean
>(
  object: TObject,
  source: TSource,
  nullable: TNullable
): TNullable extends true
  ? NullableUnionObject<TObject, TSource>
  : NonNullableUnionObject<TObject, TSource>;
export function defaults(
  object: Dictionary,
  source: Dictionary,
  nullable = true
) {
  return customDefaults(
    nullable ? NullableCustomizer : NonNullableCustomizer,
    object,
    source
  );
}

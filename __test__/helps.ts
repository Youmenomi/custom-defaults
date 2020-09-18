import {
  customDefaults,
  NullableCustomizer,
  NonNullableCustomizer,
  defaults,
} from '../src';

export function getObj() {
  return { a: null, d: 'p', e: undefined, foo1: 2, foo2: undefined };
}
export function getSrc() {
  return { a: 9, b: undefined, c: null, d: 1, e: 'q' };
}

const src = getSrc();

export const tests = {
  customDefaults: [
    {
      name: 'customizer = NullableCustomizer',
      process: () => {
        return customDefaults(NullableCustomizer, getObj(), getSrc());
      },
      result: {
        a: null,
        b: undefined,
        c: null,
        d: 'p',
        e: 'q',
        foo1: 2,
        foo2: undefined,
      },
    },
    {
      name: 'customizer = NonNullableCustomizer',
      process: () => {
        return customDefaults(NonNullableCustomizer, getObj(), getSrc());
      },
      result: {
        a: 9,
        b: undefined,
        c: null,
        d: 'p',
        e: 'q',
        foo1: 2,
        foo2: undefined,
      },
    },
  ],
  Defaults: [
    {
      name: 'nullable = true',
      process: () => {
        return defaults(getObj(), getSrc());
      },
      result: {
        a: null,
        b: undefined,
        c: null,
        d: 'p',
        e: 'q',
        foo1: 2,
        foo2: undefined,
      },
    },
    {
      name: 'nullable = false',
      process: () => {
        return defaults(getObj(), getSrc(), false);
      },
      result: {
        a: 9,
        b: undefined,
        c: null,
        d: 'p',
        e: 'q',
        foo1: 2,
        foo2: undefined,
      },
    },
    {
      name: 'object = undefined',
      process: () => {
        return defaults(undefined, src, false);
      },
      result: src,
    },
    {
      name: 'object = source',
      process: () => {
        return defaults(src, src, false);
      },
      result: src,
    },
  ],
};

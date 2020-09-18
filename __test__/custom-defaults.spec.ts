import { tests, getObj, getSrc } from './helps';
import { defaults } from '../src';

describe('custom-defaults', () => {
  describe('test customDefaults function', () => {
    tests.customDefaults.forEach((t) => {
      it(t.name, () => {
        expect(t.process()).toStrictEqual(t.result);
      });
    });
  });
  describe('test defaults function', () => {
    tests.Defaults.forEach((t) => {
      it(t.name, () => {
        expect(t.process()).toStrictEqual(t.result);
      });
    });
  });
  describe('test types', () => {
    const option1 = defaults(getObj(), getSrc());
    option1.a as null;
    option1.b as undefined;
    option1.c as null;
    option1.d as string;
    option1.e as string;
    option1.foo1 as number;
    option1.foo2 as undefined;

    const option2 = defaults(getObj(), getSrc(), false);
    option2.a as number;
    option2.b as undefined;
    option2.c as null;
    option2.d as string;
    option2.e as string;
    option2.foo1 as number;
    option2.foo2 as undefined;
  });
});

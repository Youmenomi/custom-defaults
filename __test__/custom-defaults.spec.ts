import { tests, getObj, getSrc } from './helper';
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

    function option3(option?: { x: number; y?: string; a: null }) {
      const opt1 = defaults(option, getSrc());
      if (opt1.x === undefined) {
        opt1.x as undefined;
        opt1.y as undefined;
        opt1.a as number;
      } else {
        opt1.x as number;
        opt1.y as string | undefined;
        opt1.a as null;
      }

      const opt2 = defaults(option, getSrc(), false);
      if (opt2.x === undefined) {
        opt2.x as undefined;
        opt2.y as undefined;
        opt2.a as number;
      } else {
        opt2.x as number;
        opt2.y as string | undefined;
        opt2.a as number;
      }
    }
    option3;
  });
});

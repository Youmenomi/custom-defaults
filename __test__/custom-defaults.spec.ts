import { tests } from './helps';

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
});

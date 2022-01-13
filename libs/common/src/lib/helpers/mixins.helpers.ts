import { ClassConstructor } from '../types/class-constructor.type';

export const instanceOfMixin = (
  obj: object,
  mixin: <TBase extends ClassConstructor>(base: TBase) => ClassConstructor
) => {
  const mixinClass = mixin(class {});
  for (const propertyName of Object.getOwnPropertyNames(mixinClass.prototype)) {
    if (!obj[propertyName]) return false;
  }
  return true;
};

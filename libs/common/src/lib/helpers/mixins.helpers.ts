import { MixinConstructor } from '../types/mixin-constructor.type';

export const instanceOfMixin = (
  obj: object,
  mixin: <TBase extends MixinConstructor>(base: TBase) => MixinConstructor
) => {
  const mixinClass = mixin(class {});
  for (let propertyName of Object.getOwnPropertyNames(mixinClass.prototype)) {
    if (!obj[propertyName]) return false;
  }
  return true;
};

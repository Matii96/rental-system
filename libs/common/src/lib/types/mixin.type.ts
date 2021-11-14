import { MixinConstructor } from '@rental-system/common';

export type Mixin = <TBase extends MixinConstructor>(base: TBase) => MixinConstructor;

import { MixinConstructor } from './mixin-constructor.type';

export type Mixin = <TBase extends MixinConstructor>(base: TBase) => MixinConstructor;

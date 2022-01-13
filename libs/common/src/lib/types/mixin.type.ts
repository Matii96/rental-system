import { ClassConstructor } from './class-constructor.type';

export type Mixin = <TBase extends ClassConstructor>(base: TBase) => ClassConstructor;

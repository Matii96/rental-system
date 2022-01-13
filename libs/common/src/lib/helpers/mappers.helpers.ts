import { ClassConstructor } from '../types/class-constructor.type';

export const reverseClassMapper = <TValue>(mapper: { [key: string]: ClassConstructor<TValue> }, value: TValue) =>
  Object.keys(mapper)[Object.values(mapper).findIndex((mapperPolicy) => value instanceof mapperPolicy)];

export interface ClassOf<T> extends Function {
  new (...args: any[]): T;
}

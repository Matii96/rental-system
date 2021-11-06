type Constructor<T = {}> = new (...args: any[]) => T;

export const CanGetPaid = <TBase extends Constructor>(base: TBase) =>
  class extends base {
    salary: number;
  };

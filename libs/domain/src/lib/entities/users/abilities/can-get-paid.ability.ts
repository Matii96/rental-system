import { MixinConstructor } from '@rental-system/common';

export const CanGetPaidAbility = <TBase extends MixinConstructor>(base: TBase) =>
  class extends base {
    salary: number;

    calculateYearlySalary() {
      return this.salary * 12;
    }
  };

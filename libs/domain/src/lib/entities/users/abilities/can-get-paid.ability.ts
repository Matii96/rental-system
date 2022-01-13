import { ClassConstructor } from '@rental-system/common';

export const CanGetPaidAbility = <TBase extends ClassConstructor>(base: TBase) =>
  class extends base {
    salary: number;

    calculateYearlySalary() {
      return this.salary * 12;
    }
  };

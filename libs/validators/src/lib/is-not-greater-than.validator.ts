import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Checks if value in not greater than another value is same class
 * @param {string} property Property name to refer to
 * @param {number} by Max difference between both values. Default 0
 * @param {ValidationOptions} validationOptions
 */
export const IsNotGreaterThan = (property: string, by = 0, validationOptions?: ValidationOptions) =>
  function (object: any, propertyName: string) {
    registerDecorator({
      name: IsNotGreaterThan.name,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions || {
        message: 'Must not be greater ' + (by > 0 ? `by ${by} ` : '') + `than ${property}`,
      },
      validator: {
        validate(value: number, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue: number = args.object[relatedPropertyName] || 0;
          return typeof value === 'number' && typeof relatedValue === 'number' && value - by <= relatedValue;
        },
      },
    });
  };

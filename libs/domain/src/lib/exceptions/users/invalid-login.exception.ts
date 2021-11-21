import { UnauthorizedException } from '@nestjs/common';

export class InvalidLoginException extends UnauthorizedException {
  constructor() {
    super('Invalid login');
  }
}

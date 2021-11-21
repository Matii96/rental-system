import { BadRequestException } from '@nestjs/common';

export class NotEnoughItemsTotalException extends BadRequestException {
  constructor(id: string, reserved: number) {
    super(`Total availability of item id=${id} can't be lower than currently reserved (${reserved})`);
  }
}

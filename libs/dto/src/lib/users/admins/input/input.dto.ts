import { UserInputDto } from '../../input/input.dto';

export class AdminInputDto extends UserInputDto {
  readonly agreedToNewsletter: boolean;
  readonly salary: number;
}

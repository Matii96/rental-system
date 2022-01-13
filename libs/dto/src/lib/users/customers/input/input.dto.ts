import { UserInputDto } from '../../input/input.dto';

export class CustomerInputDto extends UserInputDto {
  readonly agreedToNewsletter: boolean;
}

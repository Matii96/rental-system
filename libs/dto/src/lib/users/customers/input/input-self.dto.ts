import { UserInputSelfDto } from '../../input/input-self.dto';

export class CustomerInputSelfDto extends UserInputSelfDto {
  readonly agreedToNewsletter: boolean;
}

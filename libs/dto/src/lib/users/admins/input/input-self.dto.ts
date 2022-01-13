import { UserInputSelfDto } from '../../input/input-self.dto';

export class AdminInputSelfDto extends UserInputSelfDto {
  readonly agreedToNewsletter: boolean;
}

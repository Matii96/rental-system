import { ItemInputDto } from '../../input/input.dto';

export class BookInputDto extends ItemInputDto {
  readonly pagesCount: number;
}

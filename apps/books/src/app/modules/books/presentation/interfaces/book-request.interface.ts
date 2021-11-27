import { BookEntity } from '@rental-system/domain';
import { IAuthenticatedRequest } from '@rental-system/auth';

export interface IBookRequest extends IAuthenticatedRequest {
  book: BookEntity;
}

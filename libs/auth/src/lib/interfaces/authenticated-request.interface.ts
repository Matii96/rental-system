import { Request } from 'express';
import { IUser } from '@rental-system/domain';

export interface IAuthenticatedRequest extends Request {
  user: IUser;
}

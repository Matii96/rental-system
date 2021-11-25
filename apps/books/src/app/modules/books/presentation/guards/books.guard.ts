import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { BooksRepository } from '../../infrastructure/database/repositories/books.repository';
import { IBookRequest } from '../interfaces/user-request.interface';

@Injectable()
export class BooksGuard implements CanActivate {
  constructor(private readonly repository: BooksRepository) {}

  private getUser(user: IUser, bookId: string) {
    return this.repository.findById(bookId);
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IBookRequest>();
        req.book = await this.getUser(req.user, req.params.bookId);
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}

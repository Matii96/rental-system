import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { bookEntityMock } from '@rental-system/domain-testing';
import { BooksRepository } from '../../infrastructure/database/repositories/books.repository';
import { IBookRequest } from '../interfaces/book-request.interface';
import { BooksGuard } from './books.guard';

describe('BooksGuard', () => {
  let guard: BooksGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksGuard,
        {
          provide: BooksRepository,
          useValue: { findById: jest.fn() },
        },
      ],
    }).compile();

    guard = module.get(BooksGuard);
  });

  it('should activate route', async () => {
    const book = bookEntityMock();
    const req = <IBookRequest>(<unknown>{ params: { bookId: 'id' } });
    const contextMock = <ExecutionContext>{
      getHandler: () => null,
      getType: () => 'http',
      switchToHttp: () => ({ getRequest: () => req }),
    };
    // @ts-ignore
    jest.spyOn(guard, 'getBook').mockResolvedValueOnce(book);

    expect(await guard.canActivate(contextMock)).toBe(true);
    expect(req.book).toBe(book);
  });
});

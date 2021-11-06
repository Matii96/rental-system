import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { ICountableData } from '@rental-system/common';
import { BooksController } from './books.controller';
import { BookOutputDto } from './dto/output.dto';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let booksServiceMock: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: { getAll: jest.fn((): ICountableData<BookOutputDto> => ({ data: [], total: 0 })) },
        },
      ],
    }).compile();

    controller = module.get(BooksController);
    booksServiceMock = module.get(BooksService);
  });

  it('should get all queried books', async () => {
    const req = <Request>{ res: <any>{ setHeader: jest.fn() } };
    expect(await controller.list(req, { toOptions: jest.fn() })).toEqual([]);
    expect(booksServiceMock.getAll).toHaveBeenCalledTimes(1);
  });
});

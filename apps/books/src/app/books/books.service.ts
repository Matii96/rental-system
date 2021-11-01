import { Injectable } from '@nestjs/common';
import { BooksRepository } from './repositories/books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}
}

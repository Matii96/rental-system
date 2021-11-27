import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BookEntity, UserAdminEntity } from '@rental-system/domain';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { UserAccess } from '@rental-system/auth';
import { BooksService } from '../application/books.service';
import { RequestBook } from './decorators/request-book.decorator';
import { BooksGuard } from './guards/books.guard';
import { BookOutputDto } from './dto/output.dto';
import { BookInputDto } from './dto/input.dto';

@ApiTags('Books')
@Controller('v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: [BookOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.booksService.getAll(query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data.map((book) => new BookOutputDto(book));
  }

  @Get(':bookId')
  @ApiOkResponse({ type: BookOutputDto })
  getById(@RequestBook() book: BookEntity) {
    return new BookOutputDto(book);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: BookOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: BookInputDto) {
    return new BookOutputDto(await this.booksService.create(data));
  }

  @Put(':bookId')
  @UseGuards(BooksGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'bookId' })
  @ApiOkResponse({ type: BookOutputDto })
  @ApiBadRequestResponse()
  async update(@RequestBook() book: BookEntity, @Body() data: BookInputDto) {
    await this.booksService.update(book, data);
    return new BookOutputDto(book);
  }

  @Delete(':bookId')
  @UseGuards(BooksGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'bookId' })
  @ApiOkResponse({ type: BookOutputDto })
  async delete(@RequestBook() book: BookEntity) {
    await this.booksService.delete(book);
    return new BookOutputDto(book);
  }
}

import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BookEntity, UserAdminEntity } from '@rental-system/domain';
import { ReactAdminQueryDto } from '@rental-system/nest-dto';
import { UserAccess } from '@rental-system/auth';
import { BooksService } from '../application/books.service';
import { RequestBook } from './decorators/request-book.decorator';
import { BooksGuard } from './guards/books.guard';
import { BookRestOutputDto } from './dto/rest-output.dto';
import { BookRestInputDto } from './dto/rest-input.dto';

@ApiTags('Books')
@Controller('v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: [BookRestOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.booksService.getAll(query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data.map((book) => new BookRestOutputDto(book));
  }

  @Get(':bookId')
  @ApiOkResponse({ type: BookRestOutputDto })
  getById(@RequestBook() book: BookEntity) {
    return new BookRestOutputDto(book);
  }

  @Post()
  @UserAccess(UserAdminEntity)
  @ApiCreatedResponse({ type: BookRestOutputDto })
  @ApiBadRequestResponse()
  async create(@Body() data: BookRestInputDto) {
    return new BookRestOutputDto(await this.booksService.create(data));
  }

  @Put(':bookId')
  @UseGuards(BooksGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'bookId' })
  @ApiOkResponse({ type: BookRestOutputDto })
  @ApiBadRequestResponse()
  async update(@RequestBook() book: BookEntity, @Body() data: BookRestInputDto) {
    await this.booksService.update(book, data);
    return new BookRestOutputDto(book);
  }

  @Delete(':bookId')
  @UseGuards(BooksGuard)
  @UserAccess(UserAdminEntity)
  @ApiParam({ name: 'bookId' })
  @ApiOkResponse({ type: BookRestOutputDto })
  async delete(@RequestBook() book: BookEntity) {
    await this.booksService.delete(book);
    return new BookRestOutputDto(book);
  }
}

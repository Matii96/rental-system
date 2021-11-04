import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { BooksService } from './books.service';
import { BookOutputDto } from './dto/output.dto';
import { BookInputDto } from './dto/input.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: [BookOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.booksService.getAll(query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data;
  }

  @Post()
  @ApiCreatedResponse({ type: BookOutputDto })
  @ApiBadRequestResponse()
  create(@Body() data: BookInputDto) {
    return this.booksService.create(data);
  }
}

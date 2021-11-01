import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { BooksService } from './books.service';
import { BookOutputDto } from './dto/output.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ type: [BookOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.booksService.getAll(query.optionsFormat);
    req.res.setHeader('X-Total-Count', total);
    return data;
  }
}

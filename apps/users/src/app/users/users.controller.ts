import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { UserOutputDto } from './dto/output/output.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.usersService.getAll(query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data;
  }
}

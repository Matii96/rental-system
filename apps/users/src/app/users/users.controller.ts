import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { UsersService } from './users.service';
import { UserOutputDto } from './dto/output/output.dto';
import { UserLoginOutputDto } from './dto/output/login-output.dto';
import { UserLoginInputDto } from './dto/input/login-input.dto';

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

  @Post('login')
  @ApiOkResponse({ type: UserLoginOutputDto })
  async login(@Body() data: UserLoginInputDto) {
    return this.usersService.login(data);
  }
}

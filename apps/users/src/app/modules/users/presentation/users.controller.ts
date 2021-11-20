import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserAdminEntity } from '@rental-system/domain';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { UserAccess } from '@rental-system/auth';
import { UserLoginOutputDto } from './dto/output/login-output.dto';
import { UserLoginInputDto } from './dto/input/login-input.dto';
import { UsersService } from '../application/users.service';
import { UserGenericOutputDto } from './dto/output/generic-output.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UserAccess(UserAdminEntity)
  @ApiOkResponse({ type: [UserGenericOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.usersService.getAll(query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data.map((user) => new UserGenericOutputDto(user));
  }

  @Post('login')
  @ApiOkResponse({ type: UserLoginOutputDto })
  async login(@Body() data: UserLoginInputDto) {
    const { user, jwt } = await this.usersService.login(data);
    return new UserLoginOutputDto(user, jwt);
  }
}

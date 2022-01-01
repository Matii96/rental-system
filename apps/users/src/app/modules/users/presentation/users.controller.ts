import { Body, Controller, Get, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { AggregateId, BaseController } from '@rental-system/common';
import { InvalidLoginException, UserAdminEntity } from '@rental-system/domain';
import { ReactAdminQueryDto } from '@rental-system/dto';
import { UserAccess } from '@rental-system/auth';
import { UserGetByIdQueryPattern } from '@rental-system/microservices';
import { UsersService } from '../application/users.service';
import { UserLoginOutputDto } from './dto/output/login-output.dto';
import { UserLoginInputDto } from './dto/input/login-input.dto';
import { UserGenericOutputDto } from './dto/output/generic-output.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController extends BaseController {
  protected readonly handledExceptions = {
    [InvalidLoginException.name]: UnauthorizedException,
  };

  constructor(private readonly usersService: UsersService) {
    super();
  }

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
    try {
      const { user, jwt } = await this.usersService.login(data);
      return new UserLoginOutputDto(user, jwt);
    } catch (err) {
      this.transformException(err);
    }
  }

  @MessagePattern(new UserGetByIdQueryPattern())
  microserviceGetById(userId: AggregateId) {
    return this.usersService.getById(plainToClass(AggregateId, userId));
  }
}

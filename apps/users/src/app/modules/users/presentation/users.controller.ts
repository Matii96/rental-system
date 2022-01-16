import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { AggregateId } from '@rental-system/common';
import { InvalidLoginException, UserAdminEntity } from '@rental-system/domain';
import { DomainExceptionInterceptor } from '@rental-system/filters';
import { ReactAdminQueryDto } from '@rental-system/dto-nest';
import { UserRestAccess } from '@rental-system/auth';
import { UserGetByIdQueryPattern } from '@rental-system/microservices';
import { UsersService } from '../application/users.service';
import { UserLoginRestOutputDto } from './dto/rest-output/user.login-output.dto';
import { UserLoginRestInputDto } from './dto/rest-input/login-input.dto';
import { UserGenericRestOutputDto } from './dto/rest-output/user.generic-output.dto';

@ApiTags('Users')
@UseInterceptors(
  new DomainExceptionInterceptor({ [InvalidLoginException.name]: UnauthorizedException }, InternalServerErrorException)
)
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UserRestAccess(UserAdminEntity)
  @ApiOkResponse({ type: [UserGenericRestOutputDto] })
  async list(@Req() req: Request, @Query() query: ReactAdminQueryDto) {
    const { data, total } = await this.usersService.getAll(query.toOptions());
    req.res.setHeader('X-Total-Count', total);
    return data.map((user) => new UserGenericRestOutputDto(user));
  }

  @Post('login')
  @ApiOkResponse({ type: UserLoginRestOutputDto })
  async login(@Body() data: UserLoginRestInputDto) {
    const { user, jwt } = await this.usersService.login(data);
    return new UserLoginRestOutputDto(user, jwt);
  }

  @MessagePattern(new UserGetByIdQueryPattern())
  microserviceGetById(userId: AggregateId) {
    return this.usersService.getById(plainToClass(AggregateId, userId));
  }
}

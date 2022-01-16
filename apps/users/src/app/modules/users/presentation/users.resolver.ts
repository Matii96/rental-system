import { InternalServerErrorException, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserGqlAccess } from '@rental-system/auth';
import { InvalidLoginException, UserAdminEntity } from '@rental-system/domain';
import { FindAllGqlArgs } from '@rental-system/dto-nest';
import { DomainExceptionInterceptor } from '@rental-system/filters';
import { UsersService } from '../application/users.service';
import { UserLoginGqlInputDto } from './dto/gql-input/user.gql-login-input.dto';
import { UserGenericGqlOutputDto } from './dto/gql-output/user.gql-generic-output';
import { UserLoginGqlOutputDto } from './dto/gql-output/user.gql-login-output';

@Resolver()
@UseInterceptors(
  new DomainExceptionInterceptor({ [InvalidLoginException.name]: UnauthorizedException }, InternalServerErrorException)
)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserGenericGqlOutputDto])
  @UserGqlAccess(UserAdminEntity)
  async users(@Args() args: FindAllGqlArgs) {
    const { data } = await this.usersService.getAll(args);
    return data.map((user) => new UserGenericGqlOutputDto(user));
  }

  @Query(() => UserLoginGqlOutputDto)
  async login(@Args('credentials') data: UserLoginGqlInputDto) {
    const { user, jwt } = await this.usersService.login(data);
    return new UserLoginGqlOutputDto(user, jwt);
  }
}

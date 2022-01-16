import { Field, ObjectType } from '@nestjs/graphql';
import { IUser } from '@rental-system/domain';
import { UserLoginOutputDto } from '@rental-system/dto';
import { UserGqlOutputDto } from './user.gql-output';

@ObjectType()
export class UserLoginGqlOutputDto extends UserGqlOutputDto implements UserLoginOutputDto {
  @Field(() => String)
  readonly jwt: string;

  constructor(user: IUser, jwt: string) {
    super(user);
    this.jwt = jwt;
  }
}

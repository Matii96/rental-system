import { Field, ObjectType } from '@nestjs/graphql';
import { IUser, UserTypes } from '@rental-system/domain';
import { UserGenericOutputDto } from '@rental-system/dto';
import { UserGqlOutputDto } from './user.gql-output';

@ObjectType()
export class UserGenericGqlOutputDto extends UserGqlOutputDto implements UserGenericOutputDto {
  @Field(() => String)
  readonly type: UserTypes;

  constructor(user: IUser) {
    super(user);
    this.type = user.type;
  }
}

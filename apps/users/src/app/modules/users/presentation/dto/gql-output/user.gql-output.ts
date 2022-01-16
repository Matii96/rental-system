import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutputDto } from '@rental-system/dto';

@ObjectType()
export abstract class UserGqlOutputDto extends UserOutputDto {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly active: boolean;
}

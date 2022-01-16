import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserLoginInputDto } from '@rental-system/dto';

@InputType()
export class UserLoginGqlInputDto extends UserLoginInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly nameOrEmail: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

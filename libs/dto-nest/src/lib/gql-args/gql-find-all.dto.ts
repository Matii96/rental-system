import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { FindAllSearchOptions, QueryOrderEnum } from '@rental-system/common';

@ArgsType()
export class FindAllGqlArgs implements FindAllSearchOptions {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  sort?: string;

  @Field(() => String, { nullable: true })
  order?: QueryOrderEnum;

  @Field({ nullable: true })
  from?: number;

  @Field({ nullable: true })
  to?: number;

  @Field({ nullable: true })
  search?: string;
}

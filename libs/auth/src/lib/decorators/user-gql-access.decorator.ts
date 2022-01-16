import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ClassOf, Mixin } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { AuthMetadata } from '../enums/metadata.enum';
import { UserAuthorizationGuard } from '../guards/user-authorization.guard';
import { UserGqlAuthenticationGuard } from '../guards/user-gql-authentication.guard';

/**
 * Allow only given user types to access this endpoint. Accepts user's classes and mixins. No args means access for any authenticated user
 * @param {(ClassOf<IUser> | Mixin)[]} allowed
 */
export const UserGqlAccess = (...allowed: (ClassOf<IUser> | Mixin)[]) => {
  const decorators = [
    SetMetadata(AuthMetadata.AUTH_ALLOWED, allowed),
    UseGuards(UserGqlAuthenticationGuard, UserAuthorizationGuard),
  ];

  return applyDecorators(...decorators);
};

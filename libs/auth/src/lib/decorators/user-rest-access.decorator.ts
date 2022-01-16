import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiHeader, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ClassOf, Mixin } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { AuthMetadata } from '../enums/metadata.enum';
import { UserAuthorizationGuard } from '../guards/user-authorization.guard';
import { UserRestAuthenticationGuard } from '../guards/user-rest-authentication.guard';

/**
 * Allow only given user types to access this endpoint. Accepts user's classes and mixins. No args means access for any authenticated user
 * @param {(ClassOf<IUser> | Mixin)[]} allowed
 */
export const UserRestAccess = (...allowed: (ClassOf<IUser> | Mixin)[]) => {
  const decorators = [
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer <token>',
      required: true,
    }),
    ApiUnauthorizedResponse(),
    SetMetadata(AuthMetadata.AUTH_ALLOWED, allowed),
    UseGuards(UserRestAuthenticationGuard, UserAuthorizationGuard),
  ];
  if (allowed.length > 0) decorators.push(ApiForbiddenResponse());

  return applyDecorators(...decorators);
};

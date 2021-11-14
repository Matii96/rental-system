import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ClassOf, Mixin } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { AuthMetadata } from '../enums/metadata.enum';
import { UserAuthenticationGuard } from '../guards/user-authentication.guard';
import { UserAuthorizationGuard } from '../guards/user-authorization.guard';

/**
 * Allow only given user types to access this endpoint. Accepts user's classes and mixins. No args means access for any authenticated user
 * @param {(ClassOf<IUser> | Mixin)[]} allowed
 */
export const UserAccess = (...allowed: (ClassOf<IUser> | Mixin)[]) =>
  applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer <token>',
      required: true,
    }),
    SetMetadata(AuthMetadata.AUTH_ALLOWED, allowed),
    UseGuards(UserAuthenticationGuard, UserAuthorizationGuard)
  );

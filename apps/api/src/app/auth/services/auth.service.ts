import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserOutput } from '../../user/dtos/user-output.dto';
import { UserService } from '../../user/services/user.service';
import { ROLE } from '../constants/role.constant';
import { RegisterInput } from '../dtos/auth-register-input.dto';
import { RegisterOutput } from '../dtos/auth-register-output.dto';
import {
  AuthTokenOutput,
  UserAccessTokenClaims,
} from '../dtos/auth-token-output.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
  }

  async validateUser(
    ctx: RequestContext,
    username: string,
    pass: string,
  ): Promise<UserAccessTokenClaims> {
    // The userService will throw Unauthorized in case of invalid username/password.
    const user = await this.userService.validateUsernamePassword(
      ctx,
      username,
      pass,
    );

    // Prevent disabled users from logging in.
    if (user.isAccountDisabled) {
      throw new UnauthorizedException('This user account has been disabled');
    }

    return user;
  }

  login(ctx: RequestContext): AuthTokenOutput {
    console.log('login', ctx.user);

    return this.getAuthToken(ctx, ctx.user);
  }

  async register(
    ctx: RequestContext,
    input: RegisterInput,
  ): Promise<RegisterOutput> {
    // TODO : Setting default role as USER here. Will add option to change this later via ADMIN users.
    input.roles = [ROLE.USER];
    input.isAccountDisabled = false;
    input.avatar = `https://avatars.dicebear.com/api/adventurer-neutral/${input.email}.svg`

    const registeredUser = await this.userService.createUser(ctx, input);
    return plainToClass(RegisterOutput, registeredUser, {
      excludeExtraneousValues: true,
    });
  }

  async refreshToken(ctx: RequestContext): Promise<AuthTokenOutput> {
    const user = await this.userService.findById(ctx, ctx.user.id);
    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }

    return this.getAuthToken(ctx, user);
  }

  getAuthToken(
    ctx: RequestContext,
    user: UserAccessTokenClaims | UserOutput,
  ): AuthTokenOutput {
    const subject = { sub: user.id };
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    try {
      const authToken = {
        refreshToken: this.jwtService.sign(subject, {
          expiresIn: this.configService.get('jwt.refreshTokenExpiresInSec'),
        }),
        accessToken: this.jwtService.sign(
          { ...payload, ...subject },
          { expiresIn: this.configService.get('jwt.accessTokenExpiresInSec') },
        ),
      };

      console.log('authToken', authToken);

      return plainToClass(AuthTokenOutput, authToken, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid user id');
    }

}
}

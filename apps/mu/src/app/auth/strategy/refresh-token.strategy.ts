import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extractJWTFromCookie } from './util';
import { JwtPayload, JwtPayloadWithToken } from '../dto/jwt-payload';

export const REFRESH_STRATEGY_NAME = 'jwt-refresh';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_STRATEGY_NAME,
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) =>
          extractJWTFromCookie(
            req,
            configService.get('AUTH_REFRESH_TOKEN_COOKIE_NAME'),
          ),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('AUTH_REFRESH_TOKEN_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithToken> {
    const refreshToken =
      extractJWTFromCookie(
        req,
        this.configService.get('AUTH_REFRESH_TOKEN_COOKIE_NAME'),
      ) || req.headers.authorization?.split(' ')[1];

    if (!refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    return {
      token: refreshToken,
      userId: payload.userId,
      email: payload.email,
    };
  }
}

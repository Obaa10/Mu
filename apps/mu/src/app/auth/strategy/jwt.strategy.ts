import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../dto/jwt-payload';
import { extractJWTFromCookie } from './util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req) =>
                    extractJWTFromCookie(
                        req,
                        configService.get('AUTH_TOKEN_COOKIE_NAME'),
                    ),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('AUTH_TOKEN_JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        return { ...payload };
    }




}
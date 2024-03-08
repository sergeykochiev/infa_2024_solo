import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

const cookieExtractor = (request: Request) => {
  if (request && request.cookies) {
    console.log(request.cookies.dupa)
    return request.cookies.jwt
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      usernameField: 'login',
      secretOrKey: configService.get('jwt').secret,
    })
  }

  async validate(payload: any) {
    return { id: payload.sub, login: payload.username }
  }
}
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cs: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: cs.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string; plan: string }) {
    // attaches payload to request.user
    return { userId: payload.sub, email: payload.email, plan: payload.plan };
  }
}

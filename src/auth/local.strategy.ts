// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authSvc: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    // returns the user without password if valid, or throws UnauthorizedException
    return this.authSvc.validateUser(email, password);
  }
}

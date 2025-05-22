import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSvc: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersSvc.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const { password, ...safe } = user;
    return safe;
  }

  async login(user: {
    id: number;
    email: string;
    membership: { plan: string };
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      plan: user.membership.plan,
    };
    return { access_token: this.jwt.sign(payload) };
  }
}

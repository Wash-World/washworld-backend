import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSvc: UsersService,
    private readonly jwt: JwtService,
  ) {}

  // Purpose: Check if the email exists and the password is correct.
  // Returns: The user (without the password), or throws an error if login fails.
  // Used in: LocalStrategy
  async validateUser(email: string, pass: string): Promise<UserResponseDto> {
    const user = await this.usersSvc.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.usersSvc.toResponseDto(user);
  }

  // Purpose: Create a JWT token for a user who was already validated.
  // Returns: A JWT access token and the full user object.
  // User in AuthController
  async login(user: UserResponseDto) {
    const payload = {
      sub: user.id,
      email: user.email,
      plan: user.membership_plan,
    };

    const token = this.jwt.sign(payload);

    return {
      access_token: token,
      user, // full safe user
    };
  }
}

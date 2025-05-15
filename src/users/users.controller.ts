// src/users/users.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /users
   */
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.create(dto);
    // Strip out password before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  /**
   * GET /users
   */
  @Get()
  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.findAll();
  }
}

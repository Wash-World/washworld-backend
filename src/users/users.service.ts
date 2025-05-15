// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    // 1) Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 2) Create entity instance
    const user = this.usersRepo.create({
      ...dto,
      password: hashedPassword,
    });

    // 3) Save to DB
    return this.usersRepo.save(user);
  }

  // Optional helper to list users
  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }
}

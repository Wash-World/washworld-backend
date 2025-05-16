// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Membership } from '../memberships/entities/membership.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,
  ) {}

  /**
   * Create a new user with a membership.
   */
  async create(dto: CreateUserDto): Promise<User> {
    // 1) Lookup the selected membership
    const membership = await this.membershipsRepo.findOne({
      where: { membership_id: dto.membership_id },
    });
    if (!membership) {
      throw new NotFoundException('Membership plan not found');
    }

    // 2) Hash the password
    const hashed = await bcrypt.hash(dto.password, 10);

    // 3) Create & save the user
    const user = this.usersRepo.create({
      name: dto.name,
      lastname: dto.lastname,
      email: dto.email,
      password: hashed,
      mobile_num: dto.mobile_num,
      carplate: dto.carplate,
      membership,
      assigned_location_api_id: dto.assigned_location_api_id,
      all_locations: dto.all_locations,
    });
    return this.usersRepo.save(user);
  }

  /**
   * List all users (without their password field).
   */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepo.find();
    return users.map(({ password, ...rest }) => rest);
  }
}

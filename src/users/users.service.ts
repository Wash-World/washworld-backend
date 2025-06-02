// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Membership } from '../memberships/entities/membership.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,

    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,
  ) {}

  /**
   * Create a new user, hash their password, associate a membership,
   * and return only the safe fields.
   */
  async create(dto: CreateUserDto): Promise<UserResponseDto> {
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
    const userToSave = this.usersRepo.create({
      name: dto.name,
      lastname: dto.lastname,
      email: dto.email,
      password: hashed,
      mobile_num: dto.mobile_num,
      carplate: dto.carplate,
      assigned_location_api_id: dto.assigned_location_api_id,
      all_locations: dto.all_locations,
      card_owner: dto.card_owner,
      card_number: dto.card_number,
      expiry_date: dto.expiry_date,
      cvv: dto.cvv,
      membership,
    });
    const saved = await this.usersRepo.save(userToSave);

    // 4) Map to safe DTO
    return this.toResponseDto(saved);
  }

  /**
   * List all users (password/card fields never fetched due to select: false),
   * and map each to the safe DTO.
   */
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepo.find();
    return users.map((u) => this.toResponseDto(u));
  }

  /**
   * Get one user by id, or throw if not found.
   */
  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toResponseDto(user);
  }

  /**
   * (Optional) Find by email, returns raw entity for internal use only.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'name',
        'lastname',
        'mobile_num',
        'carplate',
        'assigned_location_api_id',
        'all_locations',
      ],
      relations: ['membership'], // 👈 make sure to include this!
    });
  }

  /**
   * Helper to map a User entity to UserResponseDto,
   * selecting only the whitelisted fields.
   * this is a function!!!!!!
   */
  public toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      mobile_num: user.mobile_num,
      carplate: user.carplate,
      assigned_location_api_id: user.assigned_location_api_id,
      all_locations: user.all_locations,
      membership_plan: user.membership.plan, // make sure membership is loaded!
    };
  }
}

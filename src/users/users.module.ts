// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Membership } from '../memberships/entities/membership.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Favourite } from 'src/favourites/entities/favourite.entity';

@Module({
  imports: [
    // Register both the User and Membership repositories
    TypeOrmModule.forFeature([User, Membership, Favourite]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

// src/memberships/memberships.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Service } from '../services/entities/service.entity'; // ← add this
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';

@Module({
  imports: [
    // register both repositories here
    TypeOrmModule.forFeature([Membership, Service]),
  ],
  providers: [MembershipsService],
  controllers: [MembershipsController],
})
export class MembershipsModule {}

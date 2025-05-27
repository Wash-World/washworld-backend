import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { Membership } from './entities/membership.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly svc: MembershipsService) {}

  /** POST /memberships */
  @Post()
  create(@Body() dto: CreateMembershipDto): Promise<Membership> {
    return this.svc.create(dto);
  }

  /** GET /memberships */
  @Get()
  findAll(): Promise<Membership[]> {
    return this.svc.findAll();
  }
}

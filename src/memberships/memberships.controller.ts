import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { Membership } from './entities/membership.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@Controller('memberships')
@ApiTags('memberships')
export class MembershipsController {
  constructor(private readonly svc: MembershipsService) {}

  /** POST /memberships */
  @Post()
  @ApiOperation({ summary: 'Create membership' })
  @ApiResponse({ status: 201, type: Membership })
  create(@Body() dto: CreateMembershipDto): Promise<Membership> {
    return this.svc.create(dto);
  }

  /** GET /memberships */
  @Get()
  @ApiOperation({ summary: 'List memberships' })
  @ApiResponse({ status: 200, type: [Membership] })
  findAll(): Promise<Membership[]> {
    return this.svc.findAll();
  }
}

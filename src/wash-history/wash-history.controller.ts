import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { WashHistoryService } from './wash-history.service';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { WashHistory } from './entities/wash-history.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('washes')
export class WashHistoryController {
  constructor(private readonly svc: WashHistoryService) {}

  //POST
  @Post()
  async create(@Body() dto: CreateWashHistoryDto): Promise<WashHistory> {
    console.log('🛠  create WashHistory DTO:', dto);
    return this.svc.create(dto);
  }

  //GET
  @Get('user/:userId')
  findAll(@Param('userId') userId: string): Promise<WashHistory[]> {
    return this.svc.findAllForUser(+userId);
  }
}

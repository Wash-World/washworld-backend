import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WashHistoryService } from './wash-history.service';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { WashHistory } from './entities/wash-history.entity';

@Controller('washes')
export class WashHistoryController {
  constructor(private readonly svc: WashHistoryService) {}

  /** POST /washes */
  @Post()
  async create(@Body() dto: CreateWashHistoryDto): Promise<WashHistory> {
    console.log('🛠  create WashHistory DTO:', dto);
    return this.svc.create(dto);
  }

  /** GET /washes/user/:userId */
  @Get('user/:userId')
  findAll(@Param('userId') userId: string): Promise<WashHistory[]> {
    return this.svc.findAllForUser(+userId);
  }
}

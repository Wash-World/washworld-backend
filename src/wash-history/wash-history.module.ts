// src/wash-history/wash-history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashHistory } from './entities/wash-history.entity';
import { WashHistoryService } from './wash-history.service';
import { WashHistoryController } from './wash-history.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashHistory, User])],
  providers: [WashHistoryService],
  controllers: [WashHistoryController],
})
export class WashHistoryModule {}

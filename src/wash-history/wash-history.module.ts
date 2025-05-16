// src/wash-history/wash-history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashHistory } from './entities/wash-history.entity';
import { WashHistoryService } from './wash-history.service';
import { WashHistoryController } from './wash-history.controller';
import { User } from '../users/entities/user.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashHistory, User, Feedback])],
  providers: [WashHistoryService],
  controllers: [WashHistoryController],
})
export class WashHistoryModule {}

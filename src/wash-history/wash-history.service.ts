import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashHistory } from './entities/wash-history.entity';
import { CreateWashHistoryDto } from './dto/create-wash-history.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WashHistoryService {
  constructor(
    @InjectRepository(WashHistory)
    private readonly historyRepo: Repository<WashHistory>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateWashHistoryDto): Promise<WashHistory> {
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    const record = this.historyRepo.create({
      user,
      location_api_id: dto.location_api_id,
    });
    return this.historyRepo.save(record);
  }

  findAllForUser(user_id: number): Promise<WashHistory[]> {
    return this.historyRepo.find({
      where: { user: { id: user_id } },
      order: { timestamp: 'DESC' },
    });
  }
}

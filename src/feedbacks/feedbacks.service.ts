import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { WashHistory } from '../wash-history/entities/wash-history.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private fbRepo: Repository<Feedback>,
    @InjectRepository(WashHistory)
    private whRepo: Repository<WashHistory>,
  ) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const wash = await this.whRepo.findOne({
      where: { wash_history_id: dto.wash_history_id },
    });
    if (!wash) throw new NotFoundException('Wash record not found');

    const fb = this.fbRepo.create({
      washHistory: wash,
      rating: dto.rating,
      comment: dto.comment,
      photo: dto.photo,
    });
    return this.fbRepo.save(fb);
  }

  findAllForWash(wash_history_id: number): Promise<Feedback[]> {
    return this.fbRepo.find({
      where: { washHistory: { wash_history_id } },
    });
  }
}

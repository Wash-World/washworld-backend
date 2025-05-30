import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { WashHistory } from '../wash-history/entities/wash-history.entity';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

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
  async update(feedbackId: number, dto: UpdateFeedbackDto): Promise<Feedback> {
    const fb = await this.fbRepo.findOne({
      where: { feedback_id: feedbackId },
    });
    if (!fb) throw new NotFoundException('Feedback not found');

    Object.assign(fb, dto);
    return this.fbRepo.save(fb);
  }

  findAllForWash(wash_history_id: number): Promise<Feedback[]> {
    return this.fbRepo.find({
      where: { washHistory: { wash_history_id } },
    });
  }
}

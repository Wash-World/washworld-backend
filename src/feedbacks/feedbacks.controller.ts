import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
@UseGuards(JwtAuthGuard)
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private svc: FeedbacksService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.svc.create(dto);
  }

  @Get('wash/:washId')
  findAll(@Param('washId') washId: string) {
    return this.svc.findAllForWash(+washId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.svc.update(+id, dto);
  }
}

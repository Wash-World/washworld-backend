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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@Controller('feedbacks')
@ApiTags('feedbacks')
export class FeedbacksController {
  constructor(private svc: FeedbacksService) {}

  @Post()
  @ApiOperation({ summary: 'Create feedback' })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Body() dto: CreateFeedbackDto) {
    return this.svc.create(dto);
  }

  @Get('wash/:washId')
  @ApiOperation({ summary: 'Get all feedbacks for a specific wash' })
  @ApiResponse({ status: 200, description: 'OK' })
  findAll(@Param('washId') washId: string) {
    return this.svc.findAllForWash(+washId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update feedback' })
  @ApiResponse({ status: 200, description: 'OK' })
  update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.svc.update(+id, dto);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  wash_history_id: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ example: 5 })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bad service' })
  comment: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  photo?: string;
}

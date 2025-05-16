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
  wash_history_id: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsOptional()
  photo?: string;
}

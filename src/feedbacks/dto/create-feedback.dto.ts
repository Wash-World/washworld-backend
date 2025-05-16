import { IsInt, IsString, IsOptional } from 'class-validator';
export class CreateFeedbackDto {
  @IsInt()
  wash_history_id: number;

  @IsInt()
  rating: number;

  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

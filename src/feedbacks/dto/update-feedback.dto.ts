import { IsString, IsOptional } from 'class-validator';

export class UpdateFeedbackDto {
  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  photo?: string;
}

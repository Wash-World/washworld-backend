import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateFavouriteDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  location_api_id: string;
}

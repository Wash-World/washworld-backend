import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavouriteDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user who added the favourite',
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: 'abc123',
    description: 'External ID of the location',
  })
  @IsString()
  @IsNotEmpty()
  location_api_id: string;
}

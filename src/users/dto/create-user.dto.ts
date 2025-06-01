import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  IsNumber,
  IsBoolean,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe' })
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '+4512345678' })
  mobile_num: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'DK12345' })
  carplate?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  membership_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  card_owner: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234123412341234' })
  card_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '01/30' })
  expiry_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  cvv: string;

  // If they did NOT choose “all_locations”, then assigned_location_api_id is required
  @ValidateIf((o) => !o.all_locations)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'bronshoj' })
  assigned_location_api_id?: string;

  // If they did NOT pick a specific location, then all_locations must be set
  @ValidateIf((o) => !o.assigned_location_api_id)
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: 'true' })
  all_locations?: boolean;
}

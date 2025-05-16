import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { MembershipPlan } from '../../memberships/entities/membership.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  mobile_num: string;

  @IsString()
  @IsNotEmpty()
  carplate?: string;

  @IsNumber()
  @IsNotEmpty()
  membership_id: number;

  @IsString()
  @IsOptional()
  assigned_location_api_id?: string;

  @IsBoolean()
  @IsOptional()
  all_locations?: boolean;
}

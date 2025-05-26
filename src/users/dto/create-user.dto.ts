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

  @IsString()
  @IsNotEmpty()
  mobile_num: string;

  @IsString()
  @IsNotEmpty()
  carplate?: string;

  @IsNotEmpty()
  membership_id: number;

  @IsString()
  @IsNotEmpty()
  card_owner: string;

  @IsString()
  @IsNotEmpty()
  card_number: string;

  @IsString()
  @IsNotEmpty()
  expiry_date: string;

  @IsString()
  @IsNotEmpty()
  cvv: string;

  // If they did NOT choose “all_locations”, then assigned_location_api_id is required
  @ValidateIf((o) => !o.all_locations)
  @IsString()
  @IsNotEmpty()
  assigned_location_api_id?: string;

  // If they did NOT pick a specific location, then all_locations must be set
  @ValidateIf((o) => !o.assigned_location_api_id)
  @IsBoolean()
  @IsNotEmpty()
  all_locations?: boolean;
}

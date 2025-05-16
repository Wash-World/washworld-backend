import {
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { MembershipPlan } from '../entities/membership.entity';

export class CreateMembershipDto {
  @IsEnum(MembershipPlan)
  @IsNotEmpty()
  plan: MembershipPlan;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration_wash: number;

  // if you allow creating without services, mark optional
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  serviceIds?: number[];
}

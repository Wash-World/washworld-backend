import {
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { MembershipPlan } from '../entities/membership.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMembershipDto {
  @IsEnum(MembershipPlan)
  @IsNotEmpty()
  @ApiProperty({ example: 'Guld' })
  plan: MembershipPlan;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  duration_wash: number;

  // if you allow creating without services, mark optional
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ example: [1, 2, 3] })
  serviceIds?: number[];
}

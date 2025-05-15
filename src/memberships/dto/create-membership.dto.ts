import { MembershipPlan } from '../entities/membership.entity';

export class CreateMembershipDto {
  plan: MembershipPlan;
  price: number;
  duration_wash: number; // in minutes
  serviceIds: number[]; // IDs of services to include
}

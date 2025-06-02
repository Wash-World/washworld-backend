export class UserResponseDto {
  id: number;
  name: string;
  lastname: string;
  email: string;
  mobile_num?: string;
  carplate?: string;
  assigned_location_api_id?: string;
  all_locations: boolean;
  membership_plan: string; // we’ll pull this from user.membership.plan
}

export class CreateUserDto {
  name: string;
  lastname: string;
  email: string;
  password: string;
  mobile_num?: string;
  carplate?: string;
}

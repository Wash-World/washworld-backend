// users.service.spec.ts

import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { Membership, MembershipPlan } from 'src/memberships/entities/membership.entity';
import { User } from './entities/user.entity';


describe('UsersService', () => {
  // Repositories with correct mock function types
  let usersRepo: { save: jest.Mock };
  let membershipsRepo: { findOne: jest.Mock };
  let service: UsersService;

  beforeEach(() => {
    // ------------------- ARRANGE -------------------
    usersRepo = {
      save: jest.fn(),
    };

    membershipsRepo = {
      findOne: jest.fn(),
    };

    service = new UsersService(
      usersRepo as any,
      membershipsRepo as any,
    );
  });

  it('should create a new user and return a UserResponseDto', async () => {
    // ------------------- ARRANGE -------------------
    const dto = {
      name: 'Anna',
      lastname: 'Barella',
      email: 'anna@example.com',
      password: 'plaintext',
      mobile_num: '12345678',
      carplate: 'AB12345',
      membership_id: 1,
      card_owner: 'Anna Barella',
      card_number: '1234123412341234',
      expiry_date: '12/25',
      cvv: '123',
    };

    const mockMembership: Membership = {
      membership_id: 1,
      plan: MembershipPlan.BASIC,
      price: 100,
      duration_wash: 15,
      services: [],
    };

    membershipsRepo.findOne.mockResolvedValue(mockMembership);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);

    const mockUser: User = {
    id: 1,
    name: dto.name,
    lastname: dto.lastname,
    email: dto.email,
    password: hashedPassword,
    mobile_num: dto.mobile_num,
    carplate: dto.carplate,
    membership: mockMembership,
    favourites: [],
    washHistory: [],
    all_locations: false,
    card_owner: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
    };


    usersRepo.save.mockResolvedValue(mockUser);

    // ------------------- ACT -------------------
    const result = await service.create(dto);

    // ------------------- ASSERT -------------------
    expect(membershipsRepo.findOne).toHaveBeenCalledWith({ where: { membership_id: 1 } });
    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    expect(usersRepo.save).toHaveBeenCalledWith(expect.objectContaining({ email: dto.email }));
    expect(result).toEqual(expect.objectContaining({ email: dto.email, name: dto.name }));
    expect((result as any).password).toBeUndefined(); // Should not return password
  });
});
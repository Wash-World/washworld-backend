// src/auth/membership.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  Membership,
  MembershipPlan,
} from '../memberships/entities/membership.entity';

@Injectable()
export class MembershipGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1) Extract the HTTP request object
    const request = context.switchToHttp().getRequest();
    // 2) By this point, JwtAuthGuard should have run already, so request.user.userId exists
    const { userId } = request.user as { userId: number };

    // 3) Load the user from the database, including the membership relation
    //    The User entity has `@ManyToOne(() => Membership, { eager: true })`
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['membership'],
    });

    if (!user) {
      // If no user found in the database, block access
      throw new ForbiddenException('User not found');
    }

    // 4) Check: only allow if user.membership.plan === MembershipPlan.PREMIUM
    //    MembershipPlan.PREMIUM corresponds to the "Brilliant" tier
    if (user.membership?.plan === MembershipPlan.PREMIUM) {
      return true;
    }

    // 5) Otherwise, deny access
    throw new ForbiddenException(
      'Only Brilliant members can access this resource.',
    );
  }
}

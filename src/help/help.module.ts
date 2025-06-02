import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpController } from './help.controller';
import { HelpService } from './help.service';
import { User } from 'src/users/entities/user.entity';
import { Membership } from '../memberships/entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Membership])],
  controllers: [HelpController],
  providers: [HelpService],
})
export class HelpModule {}

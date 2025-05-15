// src/memberships/entities/membership.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';

export enum MembershipPlan {
  BASIC = 'Guld',
  STANDARD = 'Premium',
  PREMIUM = 'Brilliant',
}

@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn()
  membership_id: number;

  @Column({
    type: 'enum',
    enum: MembershipPlan,
  })
  plan: MembershipPlan;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  duration_wash: number; // minutes the wash lasts

  @ManyToMany(() => Service, { eager: true })
  @JoinTable({
    name: 'membership_service',
    joinColumn: {
      name: 'membership_id',
      referencedColumnName: 'membership_id',
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'service_id',
    },
  })
  services: Service[];
}

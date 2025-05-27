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
    name: 'membership_service', // Name of the join table in the database
    // Defines how this side (Membership) maps into the join table
    joinColumn: {
      name: 'membership_id', // column in membership_service
      referencedColumnName: 'membership_id', // PK in memberships table
    },
    // Defines how the other side (Service) maps into the join table
    inverseJoinColumn: {
      name: 'service_id', // column in membership_service
      referencedColumnName: 'service_id', // PK in services table
    },
  })
  services: Service[];
}

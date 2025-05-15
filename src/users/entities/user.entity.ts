import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  mobile_num: string;

  @Column({ nullable: true })
  carplate: string;

  // ← new relation to Membership
  @ManyToOne(() => Membership, { eager: true }) //eager: true loads the membership automatically when you fetch a user.
  @JoinColumn({ name: 'membership_id' }) //The membership_id foreign-key column is created for you.
  membership: Membership;
}

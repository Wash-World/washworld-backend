import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Membership, (membership) => membership.services)
  memberships: Membership[];
}

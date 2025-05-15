import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column({ unique: true })
  name: string; // e.g. 'Shampoo', 'Tørring', 'Børstevask', etc.
}

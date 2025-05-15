import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() lastname: string;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column({ nullable: true }) mobile_num: string;
  @Column({ nullable: true }) carplate: string;
}

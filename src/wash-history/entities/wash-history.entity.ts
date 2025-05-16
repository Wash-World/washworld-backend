import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('washes_history')
export class WashHistory {
  @PrimaryGeneratedColumn()
  wash_history_id: number;

  /** Link back to the user who requested the wash */
  @ManyToOne(() => User, (user) => user.washHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /** ID for the location from the external API */
  @Column()
  location_api_id: string;

  /** Timestamp when the record was created */
  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}

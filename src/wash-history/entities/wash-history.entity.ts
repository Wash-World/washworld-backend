import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

@Entity('washes_history')
export class WashHistory {
  @PrimaryGeneratedColumn()
  wash_history_id: number;

  @ManyToOne(() => User, (user) => user.washHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /** ID for the location from the external API */
  @Column()
  location_api_id: string;

  /** Automatically set when saved */
  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @OneToMany(() => Feedback, (fb) => fb.washHistory, { cascade: true })
  feedbacks: Feedback[];
}

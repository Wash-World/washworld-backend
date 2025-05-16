import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WashHistory } from '../../wash-history/entities/wash-history.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  /** Which wash this feedback belongs to */
  @ManyToOne(() => WashHistory, (wh) => wh.feedbacks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wash_history_id' })
  washHistory: WashHistory;

  /** e.g. 1–5 stars */
  @Column({ type: 'int' })
  rating: number;

  @Column('text')
  comment: string;

  @Column({ type: 'text', nullable: true })
  photo?: string;
}

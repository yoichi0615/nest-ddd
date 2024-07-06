import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { GoalEntity } from './goal.entity';

@Entity('progresses')
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GoalEntity, (goal) => goal.progresses)
  @JoinColumn({ name: 'goal_id' })
  goal: GoalEntity;

  @Column({ name: 'comment' })
  comment: string;

  @Column({ name: 'image' })
  image: string;

  @Column('date', { name: 'date' })
  date: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}

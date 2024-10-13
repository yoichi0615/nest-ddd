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
export class ProgressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'goal_id' })
  goalId: number;

  @ManyToOne(() => GoalEntity, (goal) => goal.progresses, { nullable: false })
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

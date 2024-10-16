// src/entity/goal.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { ProgressEntity } from './progress.entity';

@Entity('goals')
export class GoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.goals, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ProgressEntity, (progress) => progress.goal)
  progresses: ProgressEntity[];

  @Column()
  name: string;

  @Column({ name: 'penalty_date', nullable: true })
  penaltyDate: Date;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    name: 'penalty_amount',
    nullable: true,
  })
  penaltyAmount: number;

  @Column({ name: 'is_achieved', nullable: true })
  isAchieved: boolean;

  @Column('text')
  description: string;

  @Column('date', { name: 'start_date' })
  startDate: Date;

  @Column('int')
  frequency: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;
}

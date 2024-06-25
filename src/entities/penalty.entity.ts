import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { GoalEntity } from './goal.entity';
import { User } from './user.entity';

@Entity('penalties')
export class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.penalties)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => GoalEntity, (goal) => goal.penalty)
  @JoinColumn({ name: 'goal_id' })
  goal: GoalEntity;

  @Column('date')
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

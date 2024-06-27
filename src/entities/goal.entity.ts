// src/entity/goal.entity.ts
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
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Penalty } from './penalty.entity';
import { Progress } from './progresses.entity';

@Entity('goals')
export class GoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Progress, (progress) => progress.goal)
  progresses: Progress[];

  @OneToOne(() => Penalty, (penalty) => penalty.id)
  penalty: Penalty;

  @Column()
  name: string;

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

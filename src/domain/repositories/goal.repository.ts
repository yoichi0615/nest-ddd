import { GoalName } from '../goal/goal-name.value-object';
import { Goal } from '../goal/goal.aggregate-root';
import { User } from 'src/entities/user.entity';

export interface IGoalRepository {
  save(goal: Goal): Promise<number>;
  findByName(name: GoalName): Promise<Goal | null>;
  findByUser(user: User): Promise<Goal[] | null>;
  findById(id: number): Promise<Goal>;
}

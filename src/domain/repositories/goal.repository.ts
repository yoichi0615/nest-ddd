import { GoalEntity } from 'src/entities/goal.entity';
import { GoalName } from '../goal/goal-name.value-object';
import { Goal } from '../goal/goal.aggregate-root';

export interface IGoalRepository {
  create(goal: Goal): Promise<number>;
  findByName(name: GoalName): Promise<GoalEntity | null>;
}

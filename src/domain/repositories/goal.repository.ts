import { Goal } from '../goal/goal.aggregate-root';

export interface IGoalRepository {
  create(goal: Goal): Promise<number>;
}

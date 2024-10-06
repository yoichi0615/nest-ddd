import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalName } from '../goal-name.value-object';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { Inject } from '@nestjs/common';
import { Goal } from '../goal.aggregate-root';

export class GoalDomainService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
  ) {}
  async isExist(name: GoalName): Promise<boolean> {
    const goal = await this.goalRepository.findByName(name);
    return !!goal;
  }

  async checkIfUserOwnsGoal(goal: Goal, userId: number): Promise<boolean> {
    if (goal.userId !== userId) {
      throw new Error('You do not have permission to reference this goal');
    }
    return true;
  }
}

import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalName } from '../goal-name.value-object';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
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

  checkIfUserOwnsGoal(goal: Goal, userId: number) {
    if (goal.userId !== userId) {
      throw new HttpException(
        'You do not have permission to reference this goal',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}

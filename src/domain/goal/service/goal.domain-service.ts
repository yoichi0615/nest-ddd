import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalName } from '../goal-name.value-object';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { Inject } from '@nestjs/common';

export class GoalDomainService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
  ) {}
  async isExist(name: GoalName): Promise<boolean> {
    const goal = await this.goalRepository.findByName(name);
    return !!goal;
  }
}

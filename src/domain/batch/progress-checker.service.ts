import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { Inject } from '@nestjs/common';

export class ProgressCheckerService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
  ) {}
  async checkAndApplyPenalty(goalId: number): Promise<void> {
    // const isProgressing = this.checkProgress(progresses);
    // if (!isProgressing) {
    // TODO: Process payment
    // await this.paymentService.processPenalty(goalId);
    // const goal = await this.goalRepository.findById(goalId);
    // goal.markAsNotAchieved();
    // await this.goalRepository.save(goal);
    // }
  }
}

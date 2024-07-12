import { Inject, Injectable } from '@nestjs/common';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { ProgressCheckerService } from 'src/domain/batch/progress-checker.service';

@Injectable()
export class ProgressCheckUseCase {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly progressCheckService: ProgressCheckerService,
  ) {}

  async execute(goalIds: number[]): Promise<void> {
    for (const goalId of goalIds) {
      await this.progressCheckService.checkAndApplyPenalty(goalId);
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import {
  IGOAL_REPOSITORY_TOKEN,
  IPROGRESS_REPOSITORY_TOKEN,
} from 'src/constants';
import { GoalDomainService } from 'src/domain/goal/service/goal.service';
import { Progress } from 'src/domain/progress/progress.aggregate-root';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { IProgressRepository } from 'src/domain/repositories/progress.repository';
import { CreateProgressDto } from 'src/dto/progress/progress-request.dto';

@Injectable()
export class CreateProgressService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
    private readonly goalDomainService: GoalDomainService,
    @Inject(IPROGRESS_REPOSITORY_TOKEN)
    private readonly progressRepository: IProgressRepository,
  ) {}

  async execute(
    goalId: number,
    userId: number,
    createProgressDto: CreateProgressDto,
  ): Promise<number> {
    const goal = await this.goalRepository.findById(goalId);
    this.goalDomainService.checkIfUserOwnsGoal(goal, userId);

    const date = new Date();
    const { comment, image } = createProgressDto;
    const progress = Progress.create(goalId, date, comment, image);

    return await this.progressRepository.save(progress);
  }
}

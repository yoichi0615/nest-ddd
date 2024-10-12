import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalName } from 'src/domain/goal/goal-name.value-object';
import { Goal } from 'src/domain/goal/goal.aggregate-root';
import { GoalDomainService } from 'src/domain/goal/service/goal.service';
import { GoalStartDate } from 'src/domain/goal/start-date.value-object';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { CreateProgressDto } from 'src/dto/progress/progress-request.dto';
import { CreateGoalRequestDto } from 'src/presentation/dtos/create-goal-request.dto';

@Injectable()
export class CreateProgressService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
    private readonly goalDomainService: GoalDomainService,
  ) {}

  async execute(
    userId: number,
    createProgressDto: CreateProgressDto,
  ): Promise<number> {
    const goal = Goal.create(
      userId,
      name,
      createGoalRequestDto.description,
      startDate,
      createGoalRequestDto.frequency,
      createGoalRequestDto.isAchieved,
    );

    return await this.goalRepository.save(goal);
  }
}

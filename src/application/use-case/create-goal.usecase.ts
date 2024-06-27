import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalName } from 'src/domain/goal/goal-name.value-object';
import { Goal } from 'src/domain/goal/goal.aggregate-root';
import { GoalDomainService } from 'src/domain/goal/service/goal.domain-service';
import { GoalStartDate } from 'src/domain/goal/start-date.value-object';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { CreateGoalRequestDto } from 'src/presentation/dtos/create-goal-request.dto';

@Injectable()
export class GoalService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
    private readonly goalDomainService: GoalDomainService,
  ) {}

  async create(
    createGoalRequestDto: CreateGoalRequestDto,
    userId: number,
  ): Promise<number> {
    const name = new GoalName(createGoalRequestDto.name);
    const startDate = new GoalStartDate(createGoalRequestDto.startDate);
    const isExist = this.goalDomainService.isExist(name);
    if (isExist) {
      throw new BadRequestException(`Goal name "${name}" is already used`);
    }

    const goal = Goal.create(
      userId,
      name,
      createGoalRequestDto.description,
      startDate,
      createGoalRequestDto.frequency,
    );

    return await this.goalRepository.create(goal);
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalName } from 'src/domain/goal/goal-name.value-object';
import { Goal } from 'src/domain/goal/goal.aggregate-root';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { User } from 'src/entities/user.entity';
import { CreateGoalRequestDto } from 'src/presentation/dtos/create-goal-request.dto';

@Injectable()
export class GoalService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
  ) {}

  async createGoal(
    createGoalRequestDto: CreateGoalRequestDto,
    userId: number,
  ): Promise<number> {
    const name = new GoalName(createGoalRequestDto.name);
    const goal = Goal.create(
      userId,
      name,
      createGoalRequestDto.description,
      createGoalRequestDto.startDate,
      createGoalRequestDto.frequency,
    );
    console.log(goal, 'GOALLL')
    return await this.goalRepository.create(goal);
  }
}

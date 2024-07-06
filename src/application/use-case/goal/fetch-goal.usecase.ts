import { Injectable, Inject } from '@nestjs/common';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { User } from 'src/entities/user.entity';
import { FetchGoalDto } from './fetch-goal.dto';

@Injectable()
export class FetchGoalService {
  constructor(
    @Inject(IGOAL_REPOSITORY_TOKEN)
    private readonly goalRepository: IGoalRepository,
  ) {}

  async getGoalListByUser(user: User): Promise<FetchGoalDto[] | null> {
    const goals = await this.goalRepository.findByUser(user);

    return goals.map(
      (goal) =>
        new FetchGoalDto(
          goal.id,
          goal.getName().value,
          goal.getDescription(),
          String(goal.getStartDate().value),
          goal.getFrequency(),
        ),
    );
  }
}

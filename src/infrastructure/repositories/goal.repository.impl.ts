import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalEntity } from 'src/entities/goal.entity';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { Goal } from 'src/domain/goal/goal.aggregate-root';

@Injectable()
export class GoalRepository implements IGoalRepository {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalEntityRepository: Repository<GoalEntity>,
  ) {}

  async create(goal: Goal): Promise<number> {
    console.log(goal.userId, 'USERID');
    const goalEntity = await this.goalEntityRepository.save({
      userId: goal.getUserId(),
      name: goal.getName().value,
      description: goal.getDescription(),
      startDate: goal.getStartDate(),
      frequency: goal.getFrequency(),
    });

    return goalEntity.id;
  }
}

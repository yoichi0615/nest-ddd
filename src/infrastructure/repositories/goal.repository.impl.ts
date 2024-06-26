import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalEntity } from 'src/entities/goal.entity';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { Goal } from 'src/domain/goal/goal.aggregate-root';
import { GoalName } from 'src/domain/goal/goal-name.value-object';

@Injectable()
export class GoalRepository implements IGoalRepository {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalEntityRepository: Repository<GoalEntity>,
  ) {}

  async create(goal: Goal): Promise<number> {
    const goalEntity = await this.goalEntityRepository.save({
      userId: goal.getUserId(),
      name: goal.getName().value,
      description: goal.getDescription(),
      startDate: goal.getStartDate().value,
      frequency: goal.getFrequency(),
    });

    return goalEntity.id;
  }

  async findByName(name: GoalName): Promise<GoalEntity | null> {
    return this.goalEntityRepository.findOne({ where: { name: name.value } });
  }
}

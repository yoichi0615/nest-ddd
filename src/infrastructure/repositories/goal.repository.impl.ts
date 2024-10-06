import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalEntity } from 'src/entities/goal.entity';
import { IGoalRepository } from 'src/domain/repositories/goal.repository';
import { Goal } from 'src/domain/goal/goal.aggregate-root';
import { GoalName } from 'src/domain/goal/goal-name.value-object';
import { User } from 'src/entities/user.entity';
import { GoalStartDate } from 'src/domain/goal/start-date.value-object';

@Injectable()
export class GoalRepository implements IGoalRepository {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalEntityRepository: Repository<GoalEntity>,
  ) {}

  async save(goal: Goal): Promise<number> {
    console.log(goal.getUserId(), 'GOALGETUSERID');
    const goalEntity = await this.goalEntityRepository.save({
      userId: goal.getUserId(),
      name: goal.getName().value,
      description: goal.getDescription(),
      startDate: goal.getStartDate().value,
      frequency: goal.getFrequency(),
    });

    console.log(goal.getUserId(), 'GOALGETUSERID222');
    return goalEntity.id;
  }

  async findByName(name: GoalName): Promise<Goal | null> {
    const goal = await this.goalEntityRepository.findOne({
      where: { name: name.value },
    });

    return goal
      ? new Goal(
          goal.id,
          goal.userId,
          new GoalName(goal.name),
          goal.description,
          goal.frequency,
          new GoalStartDate(String(goal.startDate)),
          goal.isAchieved,
        )
      : null;
  }

  async findById(id: number) {
    const goalEntity = await this.goalEntityRepository.findOne({
      where: { id },
    });

    if (!goalEntity) {
      throw new Error('Dont exist goal');
    }

    return new Goal(
      goalEntity.id,
      goalEntity.userId,
      new GoalName(goalEntity.name),
      goalEntity.description,
      goalEntity.frequency,
      new GoalStartDate(String(goalEntity.startDate)),
      goalEntity.isAchieved,
    );
  }

  async findByUser(user: User): Promise<Goal[] | null> {
    const goalEntities = await this.goalEntityRepository.find({
      where: { user: { id: user.id } },
    });

    if (goalEntities.length === 0) {
      return null;
    }

    return goalEntities.map(
      (goalEntity) =>
        new Goal(
          goalEntity.id,
          goalEntity.userId,
          new GoalName(goalEntity.name),
          goalEntity.description,
          goalEntity.frequency,
          new GoalStartDate(String(goalEntity.startDate)),
          goalEntity.isAchieved,
        ),
    );
  }
}

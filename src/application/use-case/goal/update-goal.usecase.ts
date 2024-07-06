import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoalEntity } from 'src/entities/goal.entity';

@Injectable()
export class UpdateGoalService {
  constructor(
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
  ) {}

  changeGoalName(): any {
    console.log('update goal');
  }
}

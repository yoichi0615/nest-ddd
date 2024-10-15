// infrastructure/schedulers/progress-check-scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgressCheckUseCase } from 'src/application/use-case/batch/progress-check.usecase';
import { GoalEntity } from 'src/entities/goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressCheckSchedulerService {
  constructor(
    private readonly progressCheckUseCase: ProgressCheckUseCase,
    @InjectRepository(GoalEntity)
    private readonly goalRepository: Repository<GoalEntity>,
  ) {}

  @Cron('0 0 * * *')
  async handleCron() {
    const goalIds = await this.getAllGoalIds();
    await this.progressCheckUseCase.execute(goalIds);
  }

  private async getAllGoalIds(): Promise<number[]> {
    // TODO: Apply logic
    return [1, 2, 3];
  }
}

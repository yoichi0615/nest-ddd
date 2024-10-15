import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProgressRepository } from 'src/domain/repositories/progress.repository';
import { ProgressEntity } from 'src/entities/progress.entity';
import { Progress } from 'src/domain/progress/progress.aggregate-root';

@Injectable()
export class ProgressRepository implements IProgressRepository {
  constructor(
    @InjectRepository(ProgressEntity)
    private readonly progressRepository: Repository<ProgressEntity>,
  ) {}

  async save(progress: Progress): Promise<number> {
    const progressEntity = await this.progressRepository.save({
      goalId: progress.getGoalId(),
      date: progress.getDate(),
      comment: progress.getComment(),
      image: progress.getImage(),
    });

    return progressEntity.id;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalRepository } from 'src/infrastructure/repositories/goal.repository.impl';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalEntity } from 'src/entities/goal.entity';
import { ProgressController } from 'src/presentation/controllers/progress.controller';
import { ProgressEntity } from 'src/entities/progress.entity';
import { GoalDomainService } from 'src/domain/goal/service/goal.service';
import { CreateProgressService } from 'src/application/use-case/progress/create-progress.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity, ProgressEntity])],
  controllers: [ProgressController],
  providers: [
    {
      provide: IGOAL_REPOSITORY_TOKEN,
      useClass: GoalRepository,
    },
    GoalDomainService,
    CreateProgressService,
  ],
  exports: [IGOAL_REPOSITORY_TOKEN],
})
export class ProgressModule {}

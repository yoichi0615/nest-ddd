import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateGoalService } from 'src/application/use-case/goal/create-goal.usecase';
import { FetchGoalService } from 'src/application/use-case/goal/fetch-goal.usecase';
import { GoalRepository } from 'src/infrastructure/repositories/goal.repository.impl';
import { IPROGRESS_REPOSITORY_TOKEN } from 'src/constants';
import { GoalEntity } from 'src/entities/goal.entity';
import { GoalDomainService } from 'src/domain/goal/service/goal.service';
import Stripe from 'stripe';
import { ProgressController } from 'src/presentation/controllers/progress.controller';
import { ProgressEntity } from 'src/entities/progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity, ProgressEntity])],
  controllers: [ProgressController],
  providers: [
    CreateGoalService,
    FetchGoalService,
    Stripe,
    GoalDomainService,
    {
      provide: IPROGRESS_REPOSITORY_TOKEN,
      useClass: GoalRepository,
    },
  ],
  exports: [IPROGRESS_REPOSITORY_TOKEN],
})
export class GoalModule {}

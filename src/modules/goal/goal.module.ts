import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalController } from 'src/presentation/controllers/goal.controller';
import { CreateGoalService } from 'src/application/use-case/create-goal.usecase';
import { GetGoalService } from 'src/application/use-case/get-goal.usecase';
import { GoalRepository } from 'src/infrastructure/repositories/goal.repository.impl';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalEntity } from 'src/entities/goal.entity';
import { GoalDomainService } from 'src/domain/goal/service/goal.domain-service';
import Stripe from 'stripe';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  controllers: [GoalController],
  providers: [
    CreateGoalService,
    GetGoalService,
    Stripe,
    GoalDomainService,
    {
      provide: IGOAL_REPOSITORY_TOKEN,
      useClass: GoalRepository,
    },
  ],
  exports: [IGOAL_REPOSITORY_TOKEN],
})
export class GoalModule {}

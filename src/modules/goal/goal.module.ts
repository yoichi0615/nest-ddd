import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalController } from 'src/presentation/controllers/goal.controller';
import { GoalService } from 'src/application/use-case/create-goal.usecase';
import { GoalRepository } from 'src/infrastructure/repositories/goal.repository.impl';
import { IGOAL_REPOSITORY_TOKEN } from 'src/constants';
import { GoalEntity } from 'src/entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  controllers: [GoalController],
  providers: [
    GoalService,
    {
      provide: IGOAL_REPOSITORY_TOKEN,
      useClass: GoalRepository,
    },
  ],
  exports: [IGOAL_REPOSITORY_TOKEN],
})
export class GoalModule {}

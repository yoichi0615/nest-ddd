import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GoalModule } from './modules/goal/goal.module';
import { User } from './entities/user.entity';
import { GoalEntity } from './entities/goal.entity';
import { Penalty } from './entities/penalty.entity';
import { Payment } from './entities/payment.entity';
import { Progress } from './entities/progresses.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, GoalEntity, Penalty, Payment, Progress],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    GoalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

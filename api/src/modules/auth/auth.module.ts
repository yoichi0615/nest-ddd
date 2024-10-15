import { Module } from '@nestjs/common';
import { AuthService } from 'src/application/use-case/auth.service';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from 'src/infrastructure/strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { USER_REPOSITORY_TOKEN } from 'src/domain/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key',
      signOptions: { expiresIn: '6h' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: 'UserRepository',
      useExisting: USER_REPOSITORY_TOKEN,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserRequestDto } from 'src/presentation/dtos/create-user-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    console.log(payload, 'PAYLOAD');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(CreateUserRequestDto: CreateUserRequestDto): Promise<User> {
    const { name, email, password } = CreateUserRequestDto;

    if (!this.isPasswordValid(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long, and include at least one number and one special character.',
      );
    }

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  private isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return password.length >= 8 && passwordRegex.test(password);
  }
}

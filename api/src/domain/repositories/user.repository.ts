import { User } from '../../entities/user.entity';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';

export interface UserRepository {
  findOne(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): User;
  save(user: User): Promise<User>;
}

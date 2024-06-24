import { IsString, IsDate, IsInt, IsOptional } from 'class-validator';

export class CreateGoalRequestDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  startDate: Date;

  @IsInt()
  frequency: number;
}

export class UpdateGoalRequestDTO {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsInt()
  frequency?: number;
}

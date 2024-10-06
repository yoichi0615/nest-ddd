import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsBoolean } from 'class-validator';

export class CreateGoalRequestDto {
  @ApiProperty({ example: 'Learn NestJS', description: 'The name of the goal' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'Complete the official documentation',
    description: 'The description of the goal',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ example: 1, description: 'The frequency of the goal' })
  @IsString()
  @IsNotEmpty()
  readonly frequency: number;

  @ApiProperty({
    example: '2024-06-23',
    description: 'The start date of the goal',
  })
  @IsDateString()
  readonly startDate: string;

  @IsBoolean()
  readonly isAchieved: boolean;
}

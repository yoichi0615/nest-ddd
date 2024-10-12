import { IsString, IsDate, IsInt } from 'class-validator';

export class CreateProgressRequestDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  startDate: Date;

  @IsInt()
  frequency: number;
}

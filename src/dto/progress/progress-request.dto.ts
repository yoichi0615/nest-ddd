import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateProgressDto {
  @ApiProperty({
    example: '2024-10-06',
    description: '報告（進捗を記録する）日',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '今日は1時間走った',
    description: '進捗に対するコメント（最大255文字）',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({
    example: '/images/example.jpg',
    description: '進捗に関連する画像のパスまたはURL',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}

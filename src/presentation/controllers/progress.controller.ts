import {
  Controller,
  Request,
  Param,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateProgressService } from 'src/application/use-case/progress/create-progress.usecase';
import { CreateProgressDto } from 'src/dto/progress/progress-request.dto';

@ApiTags('progresses')
@Controller()
export class ProgressController {
  // TODO: implement register progress API
  constructor(private readonly createProgressService: CreateProgressService) {}

  @UseGuards(JwtAuthGuard)
  @Post('goals/:goalId/progress')
  @ApiOperation({ summary: 'Report progress for a goal' })
  @ApiResponse({ status: 201, description: 'Progress reported successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async createProgress(
    @Param('goalId') goalId: number,
    @Body() createProgressDto: CreateProgressDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    const result = this.createProgressService.execute(
      goalId,
      userId,
      createProgressDto,
    );
    return result;
  }
}

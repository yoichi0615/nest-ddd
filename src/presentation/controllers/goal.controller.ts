import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { GoalService } from 'src/application/use-case/create-goal.usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGoalRequestDto } from '../dtos/create-goal-request.dto';

@ApiTags('goals')
@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create goal' })
  @ApiResponse({ status: 201, description: 'Goal created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: CreateGoalRequestDto })
  @ApiBearerAuth()
  async createGoal(
    @Body() createGoalRequestDto: CreateGoalRequestDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.goalService.createGoal(createGoalRequestDto, userId);
  }
}

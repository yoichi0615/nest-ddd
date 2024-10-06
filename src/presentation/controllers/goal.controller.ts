import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateGoalService } from 'src/application/use-case/goal/create-goal.usecase';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGoalRequestDto } from '../dtos/create-goal-request.dto';
import Stripe from 'stripe';
import { FetchGoalService } from 'src/application/use-case/goal/fetch-goal.usecase';

@ApiTags('goals')
@Controller('goals')
export class GoalController {
  constructor(
    private readonly createGoalService: CreateGoalService,
    private readonly fetchGoalService: FetchGoalService,
    private stripe: Stripe,
  ) {}

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
    return this.createGoalService.create(createGoalRequestDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get goal list by user' })
  @ApiResponse({ status: 200, description: 'Get goal list' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async getGoalListByUser(@Request() req) {
    const user = req.user;
    return this.fetchGoalService.getGoalListByUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':goalId')
  @ApiOperation({ summary: 'Get goal detail by id' })
  @ApiResponse({ status: 200, description: 'Get goal detail' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async getGoalDetail(@Param('goalId') goalId: number, @Request() req) {
    const userId = req.user.userId;
    return this.fetchGoalService.getGoalDetail(goalId, userId);
  }
}

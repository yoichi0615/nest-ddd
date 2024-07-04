import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateGoalService } from 'src/application/use-case/create-goal.usecase';
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
import { GetGoalService } from 'src/application/use-case/get-goal.usecase';

@ApiTags('goals')
@Controller('goals')
export class GoalController {
  constructor(
    private readonly createGoalService: CreateGoalService,
    private readonly getGoalService: GetGoalService,
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
    return this.getGoalService.getGoalListByUser(user);
  }
}

import {
  Body,
  Controller,
  Request,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateProgressRequestDTO } from 'src/dto/progress/progress-request.dto';

@ApiTags('progresses')
@Controller('goals')
export class ProgressController {
  // TODO: implement register progress API
  constructor(private readonly progressService: CreateProgressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Report progress for a goal' })
  @ApiResponse({ status: 201, description: 'Progress reported successfully' })
  async createProgress(
    @Param('goalId') goalId: number,
    @Body() createProgressRequestDto: CreateProgressRequestDTO,
    @Request() req,
  ) {
    // const userId = req.user.userId;
    // return this.progressService.createProgress(
    //   goalId,
    //   userId,
    //   createProgressDto,
    // );
  }
}

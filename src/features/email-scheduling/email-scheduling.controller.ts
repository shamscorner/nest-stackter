import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from '../../authentication/jwt-authentication.guard';
import { EmailScheduleDto } from './dto/email-schedule.dto';
import { EmailSchedulingService } from './email-scheduling.service';

@Controller('email-scheduling')
@ApiTags('email-scheduling')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }

  @Post('schedule/cancel')
  @UseGuards(JwtAuthenticationGuard)
  async cancelScheduleEmail() {
    this.emailSchedulingService.cancelAllScheduledEmails();
  }
}

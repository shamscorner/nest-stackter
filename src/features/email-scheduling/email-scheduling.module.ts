import { Module } from '@nestjs/common';
import { EmailSchedulingService } from './email-scheduling.service';
import { EmailSchedulingController } from './email-scheduling.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [EmailSchedulingService],
  controllers: [EmailSchedulingController],
})
export class EmailSchedulingModule {}

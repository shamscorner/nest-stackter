import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { OptimizeController } from './optimize.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
      processors: [
        {
          name: 'optimize',
          path: join(__dirname, 'image.processor.js'),
        },
      ],
    }),
  ],
  controllers: [OptimizeController],
})
export class OptimizeModule {}

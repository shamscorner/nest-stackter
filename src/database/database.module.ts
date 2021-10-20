import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormModuleOptions } from '../config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeormModuleOptions)],
})
export class DatabaseModule {}

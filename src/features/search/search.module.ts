import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { elasticSearchModuleOptions } from '../../config/elastic-search.config';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync(elasticSearchModuleOptions),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}

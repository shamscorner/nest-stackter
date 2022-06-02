import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { ElasticsearchModuleAsyncOptions } from '@nestjs/elasticsearch';

export const elasticSearchModuleOptions: ElasticsearchModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    node: configService.get('elasticSearch.node'),
    auth: {
      username: configService.get('elasticSearch.auth.username'),
      password: configService.get('elasticSearch.auth.password'),
    },
  }),
};

export default registerAs('elasticSearch', () => ({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || 'admin',
  },
}));

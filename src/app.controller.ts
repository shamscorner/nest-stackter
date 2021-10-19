import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    // return this.appService.getHello();

    // * config variables
    const port = this.configService.get<number>('app.port');
    const appUrl = this.configService.get<string>('app.url');
    const supportEmail = this.configService.get<string>('app.supportEmail');
    return appUrl + ':' + port + ' | ' + supportEmail;
  }
}

import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller({
  version: VERSION_NEUTRAL,
})
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
    const appEnv = this.configService.get<string>('app.env');
    const debugMode = this.configService.get<boolean>('app.debugMode');
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 24 ~ AppController ~ getHello ~ debugMode',
      debugMode,
    );

    const debugEnabled = debugMode ? 'yes' : 'no';

    return (
      '<h1>' +
      (appUrl +
        ':' +
        port +
        ' | ' +
        supportEmail +
        ' >> ' +
        appEnv +
        ' environment in debug mode: ' +
        debugEnabled) +
      '</h1>'
    );
  }
}

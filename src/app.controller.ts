import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    // * config variables
    const port = this.configService.get<number>('app.port');
    const appUrl = this.configService.get<string>('app.url');
    const supportEmail = this.configService.get<string>('app.supportEmail');
    const appEnv = this.configService.get<string>('app.env');
    const debugMode = this.configService.get<boolean>('app.debugMode');

    const debugEnabled = debugMode ? 'yes' : 'no';

    return (
      '<h1 align="center">' +
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

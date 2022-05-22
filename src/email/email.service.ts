import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      host: configService.get('email.host'),
      port: configService.get('email.port'),
      secure: configService.get('email.secure'),
      auth: {
        user: configService.get('email.user'),
        pass: configService.get('email.password'),
      },
      from: configService.get('email.from'),
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options, (err) => {
      if (err) {
        throw new InternalServerErrorException(
          `Internal Mailer Failed Error - ${err.message}`,
        );
      }
    });
  }
}

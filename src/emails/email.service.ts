import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IEmailService } from './email.interface';
import { EmailNotificationDTO } from './email.model';

@Injectable()
export class EmailService implements IEmailService {
  async sendEmail(
    notification: EmailNotificationDTO,
  ): Promise<EmailNotificationDTO> {
    return new Promise((resolve, reject) => {
      const randomBoolean: boolean = Math.random() < 0.5;

      setTimeout(
        () =>
          randomBoolean
            ? resolve(notification)
            : reject(new InternalServerErrorException('cant send email')),
        2000,
      );
    });
  }
}

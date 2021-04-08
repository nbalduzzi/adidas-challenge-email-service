import { EmailNotificationDTO } from './email.model';

export interface IEmailController {
  sendEmail(notification: EmailNotificationDTO): Promise<EmailNotificationDTO>;
}

export interface IEmailService {
  sendEmail(notification: EmailNotificationDTO): Promise<EmailNotificationDTO>;
}

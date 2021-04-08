import { Controller, Body, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IEmailController } from './email.interface';
import { EmailService } from './email.service';
import { EmailNotificationDTO } from './email.model';

@Controller('emails')
@ApiBearerAuth('Authorization')
@ApiTags('emails')
export class EmailController implements IEmailController {
  constructor(private readonly emailService: EmailService) {}

  @Put()
  @ApiResponse({ status: 200 })
  @ApiBody({ required: true, type: EmailNotificationDTO })
  async sendEmail(
    @Body() notification: EmailNotificationDTO,
  ): Promise<EmailNotificationDTO> {
    return await this.emailService.sendEmail(notification);
  }
}

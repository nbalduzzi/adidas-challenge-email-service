import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
  let emailController: EmailController;
  let emailService: EmailService;

  beforeEach(() => {
    emailService = new EmailService();
    emailController = new EmailController(emailService);
  });

  describe('send email', () => {
    it('should not throw error', async () => {
      jest
        .spyOn(emailService, 'sendEmail')
        .mockImplementation(() => Promise.resolve({ email: 'someEmail' }));

      await emailController
        .sendEmail({ email: 'someEmail' })
        .then((r) => expect(r).toEqual({ email: 'someEmail' }));
    });
  });
});

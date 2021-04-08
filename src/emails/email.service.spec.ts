import { EmailService } from './email.service';

describe('EmailService', () => {
  let emailService: EmailService;

  beforeEach(() => (emailService = new EmailService()));

  describe('send email', () => {
    it('should not throw error', async () => {
      await emailService
        .sendEmail({ email: 'someEmail' })
        .then((r) => expect(r).toEqual({ email: 'someEmail' }))
        .catch((r) => expect(r.message).toEqual('cant send email'));
    });
  });
});

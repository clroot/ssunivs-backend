import { EmailService } from '/service';
import { EmailSendRequestDTO } from '/dto';
import { randSentence, randText } from '@ngneat/falso';

describe('EmailService 의', () => {
  describe('sendEmail 메서드는', () => {
    describe('성공시', () => {
      it('email을 발송한다.', async () => {
        const payload = new EmailSendRequestDTO({
          to: 'abcdkh1209@gmail.com',
          title: randText(),
          body: randSentence(),
        });
        await EmailService.sendEmail(payload);
      });
    });
  });
});
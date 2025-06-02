import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpService {
  getHelpContent() {
    return {
      faqs: [
        {
          question: 'How do I start a wash?',
          answer:
            'Scan your car plate, select a package, then tap “Start Wash.”',
        },
        {
          question: 'How do I contact support?',
          answer: 'Email us at support@washworld.com or call 123456.',
        },
      ],
      contact: {
        email: 'support@washworld.com',
        phone: '123456',
      },
    };
  }
}

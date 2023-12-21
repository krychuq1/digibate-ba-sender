import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailerService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // this.testEmail();
  }
  async contentEmail(content: string, email: string, name: string) {
    // Convert the content string into a Buffer and then to base64
    const contentBuffer = Buffer.from(content, 'utf-8');
    const base64Content = contentBuffer.toString('base64');

    const msg = {
      to: email,
      from: 'Digibate <no-replay@digibate.com>',
      subject: '🚀 Embark on Your AI Journey: Your First Creation Awaits! ✨',
      html: this.getHtml('email-templates/content.hbs', { name }),
      attachments: [
        {
          content: base64Content,
          filename: 'content.html', // Name of the file
          type: 'text/html',
          disposition: 'attachment',
        },
      ],
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
  async testEmail() {
    const msg = {
      // to: 'krys.nagorny@gmail.com',
      from: 'Digibate <no-replay@digibate.com>',
      subject: '🚀 Embark on Your AI Journey: Your First Creation Awaits! ✨',
      html: this.getHtml('email-templates/content.hbs', { name: 'Regitze' }),
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
  private getHtml(templateUrl: string, data: any) {
    const template = Handlebars.compile(
      fs.readFileSync(path.resolve(templateUrl)).toString(),
    );
    return template(data);
  }
}

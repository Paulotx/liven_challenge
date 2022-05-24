import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import mailConfig from '@config/mail';

import { IMailProvider } from '../model/IMailProvider';

@injectable()
export class SMTPMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      this.client = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: mailConfig.defaults.from.email, // generated ethereal user
          pass: 'example', // generated ethereal password
        },
      });
    } catch (err) {
      console.error(`SMTPMailProvider - Error:\n${err}`);
    }
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'example@example.com.br',
      subject,
      html: templateHTML,
    });
  }
}

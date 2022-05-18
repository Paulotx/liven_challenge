import { container } from 'tsyringe';

import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SMTPMailProvider } from './implementations/SMTPMailProvider';
import { IMailProvider } from './model/IMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  smtp: container.resolve(SMTPMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);

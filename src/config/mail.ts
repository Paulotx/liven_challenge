interface IMailConfig {
  driver: 'ethereal' | 'smtp';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_PROVIDER || 'ethereal',

  defaults: {
    from: {
      email: 'example@example.com.br',
      name: 'example',
    },
  },
} as IMailConfig;

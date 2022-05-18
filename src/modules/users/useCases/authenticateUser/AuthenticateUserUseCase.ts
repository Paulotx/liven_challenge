import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  name: string;
}

interface IResponse {
  user: IUser;
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = authConfig;

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { privateKey, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id }, privateKey, {
      algorithm: 'RS256',
      subject: user.id,
      expiresIn,
    });

    const refresh_token = sign({}, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_in_refresh_token_days,
    );

    await this.userTokensRepository.create({
      refresh_token,
      expires_date: refresh_token_expires_date,
      user_id: user.id,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      token,
      refresh_token,
    };
  }
}

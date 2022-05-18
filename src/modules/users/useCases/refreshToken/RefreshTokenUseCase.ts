import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { IUserTokensRepository } from '@modules/users/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  profile: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refresh_token: string): Promise<ITokenResponse> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = authConfig;
    const { privateKey, expiresIn } = authConfig.jwt;

    const { sub, profile } = verify(
      refresh_token,
      secret_refresh_token,
    ) as IPayload;

    const user_id = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refresh_token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does note exists!');
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const newRefreshToken = sign({}, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      expires_in_refresh_token_days,
    );

    await this.userTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date,
    });

    const newToken = sign({ profile }, privateKey, {
      algorithm: 'RS256',
      subject: user_id,
      expiresIn,
    });

    return {
      refresh_token: newRefreshToken,
      token: newToken,
    };
  }
}

export default RefreshTokenUseCase;

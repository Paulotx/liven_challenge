import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  exp: number;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      { code: 'token.invalid', message: 'Token JWT ausente!' },
      401,
    );
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError(
      { code: 'token.invalid', message: 'Token JWT ausente!' },
      401,
    );
  }

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.jwt.publicKey,
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Esse usuário não existe!', 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    throw new AppError(
      { code: 'token.expired', message: 'Token expirado!' },
      401,
    );
  }
}

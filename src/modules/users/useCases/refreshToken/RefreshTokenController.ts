import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RefreshTokenUseCase from './RefreshTokenUseCase';

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const newToken = await refreshTokenUseCase.execute(refresh_token);

    return response.json(newToken);
  }
}

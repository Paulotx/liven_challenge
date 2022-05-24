import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserMailUseCase } from './ResetPasswordUserMailUseCase';

export class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordUserMailUseCase = container.resolve(
      ResetPasswordUserMailUseCase,
    );

    await resetPasswordUserMailUseCase.execute({
      token,
      password,
    });

    return response.send();
  }
}

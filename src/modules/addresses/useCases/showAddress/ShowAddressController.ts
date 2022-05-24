import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowAddressUseCase } from './ShowAddressUseCase';

export class ShowAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserUseCase = container.resolve(ShowAddressUseCase);

    const user = await showUserUseCase.execute(id);

    return response.json(instanceToPlain(user, { strategy: 'exposeAll' }));
  }
}

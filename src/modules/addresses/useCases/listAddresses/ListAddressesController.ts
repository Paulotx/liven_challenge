import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAddressesUseCase } from './ListAddressesUseCase';

export class ListAddressesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAddressesUseCase = container.resolve(ListAddressesUseCase);

    const addresses = await listAddressesUseCase.execute();

    return response.status(200).json(addresses);
  }
}

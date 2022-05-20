import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAddressUseCase } from './CreateAddressUseCase';

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      address,
      number,
      complement,
      neighborhood,
      cep,
      city,
      state,
      country,
    } = request.body;

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    const newAddress = await createAddressUseCase.execute({
      user_id,
      address,
      number,
      complement,
      neighborhood,
      cep,
      city,
      state,
      country,
    });

    return response.status(201).json(newAddress);
  }
}

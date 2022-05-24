import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAddressUseCase } from './UpdateAddressUseCase';

export class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    const updatedAddress = await updateAddressUseCase.execute({
      id,
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

    return response.json(
      instanceToPlain(updatedAddress, { strategy: 'exposeAll' }),
    );
  }
}

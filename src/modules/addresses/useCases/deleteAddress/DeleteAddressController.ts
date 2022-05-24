import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteAddressUseCase } from './DeleteAddressUseCase';

export class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressUseCase);

    await deleteAddress.execute(id);

    return response.status(204).json();
  }
}

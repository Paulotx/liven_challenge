import { inject, injectable } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class DeleteAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Endereço não encontrado.');
    }

    await this.addressesRepository.remove(address);
  }
}

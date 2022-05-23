import { inject, injectable } from 'tsyringe';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ShowAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(id: string): Promise<Address> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Endereço não encontrado.');
    }

    return address;
  }
}

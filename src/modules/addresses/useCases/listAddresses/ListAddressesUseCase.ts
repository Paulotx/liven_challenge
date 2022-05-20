import { inject, injectable } from 'tsyringe';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

@injectable()
export class ListAddressesUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(): Promise<Address[]> {
    const addresses = this.addressesRepository.listAll();
    return addresses;
  }
}

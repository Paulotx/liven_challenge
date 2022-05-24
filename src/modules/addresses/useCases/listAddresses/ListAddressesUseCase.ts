import { inject, injectable } from 'tsyringe';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

interface IRequest {
  country: string | undefined;
}

@injectable()
export class ListAddressesUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({ country }: IRequest): Promise<Address[]> {
    const addresses = await this.addressesRepository.listAll();

    return addresses.filter((address) => {
      if (country) {
        return (
          address.country.toLocaleLowerCase() === country.toLocaleLowerCase()
        );
      }
      return true;
    });
  }
}

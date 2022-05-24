import { v4 as uuid } from 'uuid';

import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { Address } from '@modules/addresses/infra/typeorm/entities/Address';

import { IAddressesRepository } from '../IAddressesRepository';

export class AddressesRepositoriesInMemory implements IAddressesRepository {
  private addresses: Address[] = [];

  public async listAll(): Promise<Address[]> {
    return this.addresses;
  }

  public async findById(id: string): Promise<Address> {
    const address = this.addresses.find((findUser) => findUser.id === id);

    return address;
  }

  public async create(userAddress: ICreateAddressDTO): Promise<Address> {
    const address = new Address();

    Object.assign(address, {
      id: uuid(),
      user_id: userAddress.user_id,
      address: userAddress.address,
      number: userAddress.number,
      complement: userAddress.complement,
      neighborhood: userAddress.neighborhood,
      cep: userAddress.cep,
      city: userAddress.city,
      state: userAddress.state,
      country: userAddress.country,
    });

    this.addresses.push(address);

    return address;
  }

  public async save(address: Address): Promise<void> {
    const findIndex = this.addresses.findIndex(
      (findUser) => findUser.id === address.id,
    );

    this.addresses[findIndex] = address;
  }

  public async remove(address: Address): Promise<void> {
    const findIndex = this.addresses.findIndex(
      (findUser) => findUser.id === address.id,
    );

    delete this.addresses[findIndex];
  }
}

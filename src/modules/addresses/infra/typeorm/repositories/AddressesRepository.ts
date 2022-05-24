import { getRepository, Repository } from 'typeorm';

import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

import { Address } from '../entities/Address';

export class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address);
  }

  async listAll(): Promise<Address[]> {
    const addresses = await this.repository.find({ relations: ['user'] });

    return addresses;
  }

  async create({
    user_id,
    address,
    number,
    complement,
    neighborhood,
    cep,
    city,
    state,
    country,
  }: ICreateAddressDTO): Promise<Address> {
    const newAddress = this.repository.create({
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

    await this.repository.save(newAddress);

    return newAddress;
  }

  public async remove(address: Address): Promise<void> {
    await this.repository.remove(address);
  }

  async save(address: Address): Promise<void> {
    await this.repository.save(address);
  }

  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    return address;
  }
}

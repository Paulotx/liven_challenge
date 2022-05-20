import { inject, injectable } from 'tsyringe';

import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
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
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const newAddress = await this.addressesRepository.create({
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

    return newAddress;
  }
}

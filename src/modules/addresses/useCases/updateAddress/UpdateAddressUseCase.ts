import { inject, injectable } from 'tsyringe';

import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';
import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest extends ICreateAddressDTO {
  id: string;
}

@injectable()
export class UpdateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
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
  }: IRequest): Promise<Address> {
    const findAddress = await this.addressesRepository.findById(id);

    if (!findAddress) {
      throw new AppError('Endereço não encontrado.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    findAddress.user_id = user_id;
    findAddress.address = address;
    findAddress.number = number;
    findAddress.complement = complement;
    findAddress.neighborhood = neighborhood;
    findAddress.cep = cep;
    findAddress.city = city;
    findAddress.state = state;
    findAddress.country = country;
    findAddress.updated_at = new Date();

    await this.addressesRepository.save(findAddress);

    return findAddress;
  }
}

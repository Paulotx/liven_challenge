import { AddressesRepositoriesInMemory } from '@modules/addresses/repositories/in-memory/AddressesRepositoriesInMemory';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import { AppError } from '@shared/errors/AppError';

import { ShowAddressUseCase } from './ShowAddressUseCase';

let addressesRepositoriesInMemory: AddressesRepositoriesInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let showAddress: ShowAddressUseCase;

describe('ShowUserUseCase', () => {
  beforeEach(() => {
    addressesRepositoriesInMemory = new AddressesRepositoriesInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    showAddress = new ShowAddressUseCase(addressesRepositoriesInMemory);
  });

  it('should be able to show a address', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'test@gmail.com',
      password: '123456',
    });

    const address = await addressesRepositoriesInMemory.create({
      user_id: user.id,
      address: 'Address',
      number: 0,
      complement: 'Complement',
      neighborhood: 'Neighborhood',
      cep: '00000-000',
      city: 'City',
      state: 'State',
      country: 'Country',
    });

    const response = await showAddress.execute(address.id);

    expect(response.address).toEqual('Address');
  });

  it('should be able to inform when an address is non-exists', async () => {
    await expect(showAddress.execute('non-exists')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

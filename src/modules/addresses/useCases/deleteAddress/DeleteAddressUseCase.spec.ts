import { AddressesRepositoriesInMemory } from '@modules/addresses/repositories/in-memory/AddressesRepositoriesInMemory';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import { AppError } from '@shared/errors/AppError';

import { DeleteAddressUseCase } from './DeleteAddressUseCase';

let addressesRepositoriesInMemory: AddressesRepositoriesInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let deleteAddress: DeleteAddressUseCase;

describe('DeleteUserUseCase', () => {
  beforeEach(() => {
    addressesRepositoriesInMemory = new AddressesRepositoriesInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    deleteAddress = new DeleteAddressUseCase(addressesRepositoriesInMemory);
  });

  it('should be able to delete an address', async () => {
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

    expect(deleteAddress.execute(address.id)).not.toBeInstanceOf(AppError);
  });

  it('should be able to inform when an address is non-exists', async () => {
    await expect(deleteAddress.execute('non-exists')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

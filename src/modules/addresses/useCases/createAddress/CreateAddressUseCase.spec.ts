import { AddressesRepositoriesInMemory } from '@modules/addresses/repositories/in-memory/AddressesRepositoriesInMemory';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import HashProviderInMemory from '@shared/container/providers/HashProvider/in-memory/HashProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateAddressUseCase } from './CreateAddressUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let addressesRepositoriesInMemory: AddressesRepositoriesInMemory;
let hashProviderInMemory: HashProviderInMemory;
let createAddress: CreateAddressUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    addressesRepositoriesInMemory = new AddressesRepositoriesInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();

    createAddress = new CreateAddressUseCase(
      addressesRepositoriesInMemory,
      usersRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able to create a new address', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'test@gmail.com',
      password: '123456',
    });

    const address = await createAddress.execute({
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

    expect(address).toHaveProperty('id');
  });

  it('should not be able to create a new address with user not-exists', async () => {
    await expect(
      createAddress.execute({
        user_id: 'non-exists-user-id',
        address: 'Address',
        number: 0,
        complement: 'Complement',
        neighborhood: 'Neighborhood',
        cep: '00000-000',
        city: 'City',
        state: 'State',
        country: 'Country',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

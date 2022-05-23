import { AddressesRepositoriesInMemory } from '@modules/addresses/repositories/in-memory/AddressesRepositoriesInMemory';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdateAddressUseCase } from './UpdateAddressUseCase';

let addressesRepositoriesInMemory: AddressesRepositoriesInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateAddress: UpdateAddressUseCase;

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    addressesRepositoriesInMemory = new AddressesRepositoriesInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    updateAddress = new UpdateAddressUseCase(
      addressesRepositoriesInMemory,
      usersRepositoryInMemory,
    );
  });

  it('should be able to update an address', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'user@gmail.com',
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

    const userUpdate = await updateAddress.execute({
      id: address.id,
      user_id: user.id,
      address: 'Address Updated',
      number: 0,
      complement: 'Complement',
      neighborhood: 'Neighborhood',
      cep: '00000-000',
      city: 'City',
      state: 'State',
      country: 'Country',
    });

    expect(userUpdate.address).toBe('Address Updated');
  });

  it('should be able to inform when an address is non-exists', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'user@gmail.com',
      password: '123456',
    });

    await expect(
      updateAddress.execute({
        id: 'non-existes',
        user_id: user.id,
        address: 'Address Updated',
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

  it('not be able to change an address with a non-existing user', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'user@gmail.com',
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

    await expect(
      updateAddress.execute({
        id: address.id,
        user_id: 'non-exists',
        address: 'Address Updated',
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

import { AddressesRepositoriesInMemory } from '@modules/addresses/repositories/in-memory/AddressesRepositoriesInMemory';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';

import { ListAddressesUseCase } from './ListAddressesUseCase';

let addressesRepositoriesInMemory: AddressesRepositoriesInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let listAddresses: ListAddressesUseCase;

describe('ListUsersUseCase', () => {
  beforeEach(() => {
    addressesRepositoriesInMemory = new AddressesRepositoriesInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    listAddresses = new ListAddressesUseCase(addressesRepositoriesInMemory);
  });

  it('should be able to list all users', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User1',
      email: 'test1@gmail.com',
      password: '123456',
    });

    const address1 = await addressesRepositoriesInMemory.create({
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

    const address2 = await addressesRepositoriesInMemory.create({
      user_id: user.id,
      address: 'Address2',
      number: 0,
      complement: 'Complement',
      neighborhood: 'Neighborhood',
      cep: '00000-000',
      city: 'City',
      state: 'State',
      country: 'Country',
    });

    const users = await listAddresses.execute();

    expect(users).toEqual([address1, address2]);
  });
});

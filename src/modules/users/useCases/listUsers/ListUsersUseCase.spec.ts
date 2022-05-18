import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';

import { ListUsersUseCase } from './ListUsersUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUsers: ListUsersUseCase;

describe('ListUsersUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    listUsers = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to list all users', async () => {
    const user1 = await usersRepositoryInMemory.create({
      name: 'User1',
      email: 'test1@gmail.com',
      password: '123456',
    });

    const user2 = await usersRepositoryInMemory.create({
      name: 'User2',
      email: 'test2@gmail.com',
      password: '123456',
    });

    const users = await listUsers.execute();

    expect(users).toEqual([user1, user2]);
  });
});

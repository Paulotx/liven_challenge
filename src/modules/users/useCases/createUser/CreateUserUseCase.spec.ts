import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import HashProviderInMemory from '@shared/container/providers/HashProvider/in-memory/HashProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let createUser: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProviderInMemory = new HashProviderInMemory();

    createUser = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'User',
      email: 'test@gmail.com',
      password: '123456',
      profile: 'admin',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'User 01',
      email: 'test@gmail.com',
      password: '123456',
      profile: 'admin',
    });

    await expect(
      createUser.execute({
        name: 'User 02',
        email: 'test@gmail.com',
        password: '123456',
        profile: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

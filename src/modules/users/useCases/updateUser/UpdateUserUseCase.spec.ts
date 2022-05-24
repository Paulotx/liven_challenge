import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdateUserUseCase } from './UpdateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateUser: UpdateUserUseCase;

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    updateUser = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to update a user', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'user@gmail.com',
      password: '123456',
    });

    const userUpdate = await updateUser.execute({
      id: user.id,
      name: 'User',
      email: 'userteste@gmail.com',
    });

    expect(userUpdate.email).toBe('userteste@gmail.com');
  });

  it('should be able to inform when an user is non-exists', async () => {
    await expect(
      updateUser.execute({
        id: 'non-exists',
        name: 'User',
        email: 'userteste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email exists', async () => {
    await usersRepositoryInMemory.create({
      name: 'User',
      email: 'user@gmail.com',
      password: '123456',
    });

    const user = await usersRepositoryInMemory.create({
      name: 'User 2',
      email: 'user2@gmail.com',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        name: 'User 2',
        email: 'user@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

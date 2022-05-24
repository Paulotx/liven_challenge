import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import { AppError } from '@shared/errors/AppError';

import { DeleteUserUseCase } from './DeleteUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let deleteUser: DeleteUserUseCase;

describe('DeleteUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    deleteUser = new DeleteUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to delete a user', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await usersRepositoryInMemory.save(user);

    expect(deleteUser.execute(user.id)).not.toBeInstanceOf(AppError);
  });

  it('should be able to inform when an user is non-exists', async () => {
    await expect(deleteUser.execute('non-exists')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

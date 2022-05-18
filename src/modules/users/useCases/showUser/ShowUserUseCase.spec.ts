import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoriesInMemory';
import { AppError } from '@shared/errors/AppError';

import { ShowUserUseCase } from './ShowUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let showUser: ShowUserUseCase;

describe('ShowUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    showUser = new ShowUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to show a user', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'test@gmail.com',
      password: '123456',
    });

    const response = await showUser.execute(user.id);

    expect(response.name).toEqual('User');
  });

  it('should be able to inform when an user is non-exists', async () => {
    await expect(showUser.execute('non-exists')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

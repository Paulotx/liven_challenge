import { v4 as uuid } from 'uuid';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  public async listAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User> {
    const user = this.users.find((findUser) => findUser.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.users.find((findUser) => findUser.email === email);

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      profile: userData.profile,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;
  }

  public async remove(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    delete this.users[findIndex];
  }
}

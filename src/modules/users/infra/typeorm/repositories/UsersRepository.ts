import { getRepository, Like, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async listAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async create({
    name,
    email,
    password,
    profile,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      password,
      email,
      profile,
    });

    await this.repository.save(user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.repository.remove(user);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}

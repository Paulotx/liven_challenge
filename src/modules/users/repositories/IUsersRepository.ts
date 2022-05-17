import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  listAll(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<User>;
  remove(user: User): Promise<void>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

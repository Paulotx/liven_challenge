import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, name, email }: IRequest): Promise<User> {
    const findUserWithEmail = await this.usersRepository.findByEmail(email);

    if (findUserWithEmail && findUserWithEmail.id !== id) {
      throw new AppError('E-mail já utilizado.');
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    user.name = name;
    user.email = email;
    user.updated_at = new Date();

    await this.usersRepository.save(user);

    return user;
  }
}

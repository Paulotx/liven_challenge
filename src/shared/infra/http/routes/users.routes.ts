import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { ShowUserController } from '@modules/users/useCases/showUser/ShowUserController';
import { UpdateUserController } from '@modules/users/useCases/updateUser/UpdateUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();

usersRoutes.use(ensureAuthenticated);

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', listUsersController.handle);
usersRoutes.get('/:id', showUserController.handle);
usersRoutes.put('/:id', updateUserController.handle);

export default usersRoutes;

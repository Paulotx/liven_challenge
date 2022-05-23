import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { DeleteUserController } from '@modules/users/useCases/deleteUser/DeleteUserController';
import { ListUsersController } from '@modules/users/useCases/listUsers/ListUsersController';
import { ShowUserController } from '@modules/users/useCases/showUser/ShowUserController';
import { UpdateUserController } from '@modules/users/useCases/updateUser/UpdateUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', ensureAuthenticated, listUsersController.handle);
usersRoutes.get('/:id', ensureAuthenticated, showUserController.handle);
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle);
usersRoutes.delete('/:id', ensureAuthenticated, deleteUserController.handle);

export default usersRoutes;

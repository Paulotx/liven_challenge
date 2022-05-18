import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.use(ensureAuthenticated);

usersRoutes.post('/', createUserController.handle);

export default usersRoutes;

import { Router } from 'express';

import { CreateAddressController } from '@modules/addresses/useCases/createAddress/CreateAddressController';
import { ListAddressesController } from '@modules/addresses/useCases/listAddresses/ListAddressesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createAddressController = new CreateAddressController();
const listAddressesController = new ListAddressesController();

usersRoutes.use(ensureAuthenticated);

usersRoutes.post('/', createAddressController.handle);
usersRoutes.get('/', listAddressesController.handle);

export default usersRoutes;

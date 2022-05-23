import { Router } from 'express';

import { CreateAddressController } from '@modules/addresses/useCases/createAddress/CreateAddressController';
import { ListAddressesController } from '@modules/addresses/useCases/listAddresses/ListAddressesController';
import { ShowAddressController } from '@modules/addresses/useCases/showAddress/ShowAddressController';
import { UpdateAddressController } from '@modules/addresses/useCases/updateAddress/UpdateAddressController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createAddressController = new CreateAddressController();
const listAddressesController = new ListAddressesController();
const showAddressController = new ShowAddressController();
const updateAddressController = new UpdateAddressController();

usersRoutes.use(ensureAuthenticated);

usersRoutes.post('/', createAddressController.handle);
usersRoutes.get('/', listAddressesController.handle);
usersRoutes.get('/:id', showAddressController.handle);
usersRoutes.put('/:id', updateAddressController.handle);

export default usersRoutes;

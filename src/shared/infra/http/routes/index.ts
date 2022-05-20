import { Router } from 'express';

import addressesRoutes from './addresses.routes';
import authenticateRoutes from './authenticate.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/addresses', addressesRoutes);
router.use(authenticateRoutes);

export default router;

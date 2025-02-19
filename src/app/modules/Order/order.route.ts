import express from 'express'
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router= express.Router();

router.post('/',auth(USER_ROLE.customer),OrderController.createOrder)
router.get('/allorder',auth(USER_ROLE.admin),OrderController.getAllOrder)





export const OrderRoutes = router;
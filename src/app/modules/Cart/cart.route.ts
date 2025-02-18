import express from 'express'
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { CartController } from './cart.controller';

const router = express.Router();

router.post('/',auth(USER_ROLE.customer),CartController.addToCart)
router.post('/removecart',auth(USER_ROLE.customer),CartController.removeCart)
router.get('/getuser',auth(USER_ROLE.customer),CartController.getCartUser)


export const CartRoutes = router; 
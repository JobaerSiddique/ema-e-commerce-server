import express from 'express';
import { WishlistController } from './wishlist.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router =express.Router();

router.post('/',auth(USER_ROLE.customer),WishlistController.addWishlist)
router.post('/removeList',auth(USER_ROLE.customer),WishlistController.removeWishList)
router.get('/',auth(USER_ROLE.customer),WishlistController.getWishlist)


export const WishlistRoute = router;
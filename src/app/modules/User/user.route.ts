import express from 'express';
import validateRequest from '../../middleware/vaildateRequest';
import { UserValidation } from './user.validationzod';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/create-user',validateRequest(UserValidation.UserSchema),UserController.createUser)
router.post('/create-admin',auth(USER_ROLE.admin),validateRequest(UserValidation.UserSchema),UserController.createAdmin)



export const UserRoutes = router;
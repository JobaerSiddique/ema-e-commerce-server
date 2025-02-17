import  express  from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/vaildateRequest";
import { AuthZodValidation } from "./auth.validation";

const router= express.Router();

router.post('/login',AuthController.loginUser)


export const AuthRoutes = router;
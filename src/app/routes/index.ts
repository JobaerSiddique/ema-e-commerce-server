import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProductRoutes } from '../modules/Product/product.route';

const router = express.Router();


const moduleRoutes = [
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/user',
        route: UserRoutes
    },
    {
        path:'/product',
        route:ProductRoutes
    }
]

moduleRoutes.forEach(route=>router.use(route.path, route.route))

export default router;
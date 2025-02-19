import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { WishlistRoute } from '../modules/Wishlist/wishlist.route';
import { CartRoutes } from '../modules/Cart/cart.route';
import { OrderRoutes } from '../modules/Order/order.route';

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
    },
    {
        path:'/wishlist',
        route:WishlistRoute
    },
    {
        path:'/cart',
        route:CartRoutes
    },
    {
        path:'/order',
        route: OrderRoutes
    }
]

moduleRoutes.forEach(route=>router.use(route.path, route.route))

export default router;
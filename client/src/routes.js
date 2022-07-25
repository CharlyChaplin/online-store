import Admin from "pages/Admin";
import Auth from "pages/Auth";
import Cart from "pages/Cart";
import DevicePage from "pages/DevicePage";
import Shop from "pages/Shop";
import { ADMIN_ROUTE, CART_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "utils/consts";

export const authRoutes = [
	{ path: ADMIN_ROUTE, element: <Admin /> },
	{ path: CART_ROUTE, element: <Cart /> },
	{ path: SHOP_ROUTE, element: <Shop /> },
	{ path: LOGIN_ROUTE, element: <Auth /> },
	{ path: REGISTRATION_ROUTE, element: <Auth /> },
	{ path: DEVICE_ROUTE + '/:id', element: <DevicePage /> }
];

export const publicRoutes = [
	{ path: SHOP_ROUTE, element: <Shop /> },
	{ path: LOGIN_ROUTE, element: <Auth /> },
	{ path: REGISTRATION_ROUTE, element: <Auth /> },
	{ path: DEVICE_ROUTE + '/:id', element: <DevicePage /> }
]
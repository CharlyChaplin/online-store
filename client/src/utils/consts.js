export const SHOP_ROUTE = '/';
export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const CART_ROUTE = '/cart';
export const DEVICE_ROUTE = '/device';

export const typesEnum = [
	{ id: 1, desc: "Холодильник" },
	{ id: 2, desc: "Телефон" },
	{ id: 3, desc: "Стиралка" },
	{ id: 4, desc: "Ноутбук" },
	{ id: 5, desc: "Планшет" },
	{ id: 6, desc: "Компьютер" },
];
export const brandsEnum = [
	{ id: 1, desc: "Бирюса" },
	{ id: 2, desc: "BQ" },
	{ id: 3, desc: "Bosch" },
	{ id: 4, desc: "Asus" },
	{ id: 5, desc: "SAMSUNG" },
	{ id: 6, desc: "ZET GAMING" },
];

export const formatter = new Intl.NumberFormat('ru-RU');
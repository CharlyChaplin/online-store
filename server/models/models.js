import myDB from "../db.js";
import { DataTypes } from "sequelize";

const User = myDB.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Basket = myDB.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	//user_id здесь внешний ключ и sequelize их подставит сам, когда будем описывать связи
});

const BasketDevice = myDB.define('basket_device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = myDB.define('device', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	rating: { type: DataTypes.STRING, defaultValue: 0 },
	img: { type: DataTypes.STRING, allowNull: false }
});

const Type = myDB.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Brand = myDB.define('brand', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Rating = myDB.define('rating', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	rate: { type: DataTypes.INTEGER, allowNull: false }
});

const DeviceInfo = myDB.define('device_info', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false }
});

//связующая таблица между Brand и Types
const TypeBrand = myDB.define('type_brand', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
	//а остальные поля, т.е. внешние ключи, sequelize добавит сам, когда вызываются методы hasMany, belongsToMany и т.д.
})

//указываем связь моделей между друг другом (Defining the Sequelize associations) https://sequelize.org/docs/v6/core-concepts/assocs/

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating); //один пользователь может иметь несколько оценок
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);		//в одной корзине может быть несколько устройств
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasOne(BasketDevice);
BasketDevice.belongsTo(Device);

//info находится в deviceController.js. Извлекается из req.body
Device.hasMany(DeviceInfo, {as: 'info'}); //одна запись в Device содержит много записей с характеристиками в DeviceInfo
DeviceInfo.belongsTo(Device);

//могли бы обозначить связи "многие ко многим", но при такой связи создаётся промежуточная таблица,
//в которой мы должны хранить информацию о том, какой бренд принадлежит какому типу и наоборот.
//Type.belongsToMany(Brand);
//Brand.belongsToMany(Type);
//Связующей таблицей будет таблица TypeBrand, которая создана выше перед перечислениями связей. См. выше.

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });



export {
	User,
	Basket,
	BasketDevice,
	Device,
	Type,
	Brand,
	Rating,
	DeviceInfo,
	TypeBrand
}
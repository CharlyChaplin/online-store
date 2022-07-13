import { Sequelize } from "sequelize";
import { config } from 'dotenv';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_SERVER } = config().parsed;

const myDB = new Sequelize(
	DB_NAME,
	DB_USER,
	DB_PASSWORD,
	{
		dialect: 'postgres',
		port: DB_PORT,
		host: DB_SERVER
	}
)

export default myDB;
import myDB from "../db.js";
import models from "../models/models.js";


const tryToConnectWidthDB = async () => {
	try {
		await myDB.authenticate();
		await myDB.sync();
		console.log('DB <<--OK-->>')
	} catch (err) {
		console.log('DB connection <<--ERROR-->>', err)
	}
}

export default tryToConnectWidthDB;
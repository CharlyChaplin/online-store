import myDB from "../db.js";


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
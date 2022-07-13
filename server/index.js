import express from 'express';
import { config } from 'dotenv';
import tryToConnectWidthDB from './utils/tryToConnectWidthDB.js';
import cors from 'cors';


const { PORT } = config().parsed || 5000;


const app = express();

app.use(cors());
app.use(express.json());	//чтобы приложение могло парсить json-формат

app.get('/', (req, res) => {
	res.status(200).json({
		message: "Hello"
	})
})


tryToConnectWidthDB();



app.listen(PORT, () => console.log(`Connection is <<--OK-->> on port ${PORT}`));
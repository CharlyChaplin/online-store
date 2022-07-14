import express from 'express';
import { config } from 'dotenv';
import tryToConnectWidthDB from './utils/tryToConnectWidthDB.js';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandlerMiddleware.js';


const { PORT } = config().parsed || 5000;


const app = express();

app.use(cors());
app.use(express.json());	//чтобы приложение могло парсить json-формат
app.use('/api', router);



app.use(errorHandler);

tryToConnectWidthDB();



app.listen(PORT, () => console.log(`Connection is <<--OK-->> on port ${PORT}`));
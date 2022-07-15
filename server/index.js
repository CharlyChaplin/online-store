import express from 'express';
import { config } from 'dotenv';
import tryToConnectWidthDB from './utils/tryToConnectWidthDB.js';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandlerMiddleware.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import getPath from './utils/getPath.js';
import fs from 'fs';

const dirname = getPath(import.meta.url);

const { PORT } = config().parsed || 5000;


const app = express();

if (!fs.existsSync('static')) fs.mkdir('static', (err) => {return console.log(err)});

app.use(cors());
app.use(express.json());	//чтобы приложение могло парсить json-формат
app.use(fileUpload({}));	//чтобы иметь возможность загружать файлы
//говорит серверу где находятся файлы
app.use(express.static(path.resolve(dirname, 'static')));
app.use('/api', router);




app.use(errorHandler);

tryToConnectWidthDB();



app.listen(PORT, () => console.log(`Connection is <<--OK-->> on port ${PORT}`));
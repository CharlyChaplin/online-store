import express from 'express';
import { config } from 'dotenv';
import tryToConnectWidthDB from './utils/tryToConnectWidthDB.js';


const { PORT } = config().parsed || 5000;


const app = express();



tryToConnectWidthDB();



app.listen(PORT, () => console.log(`Connection is <<--OK-->> on port ${PORT}`));
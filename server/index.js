import express from 'express';
import { config } from 'dotenv';


const { PORT } = config().parsed || 5000;


const app = express();






app.listen(PORT, () => console.log(`Connection is <<--OK-->> on port ${PORT}`));
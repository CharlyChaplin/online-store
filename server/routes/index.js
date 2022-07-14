import { Router } from "express";
import brandRouter from './brandRoute.js';
import deviceRouter from './deviceRoute.js';
import typeRouter from './typeRoute.js';
import userRouter from './userRoute.js';

const router = Router();


router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);


export default router;
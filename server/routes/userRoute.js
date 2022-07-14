import { Router } from "express";
import UserController from "../controllers/userController.js";


const router = new Router();


router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
//авторизован ли пользователь
router.get('/auth', UserController.check);






export default router;
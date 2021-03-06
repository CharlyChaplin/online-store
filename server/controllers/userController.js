import ApiError from "../error/ApiError.js";
import { User, Basket } from '../models/models.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

const { SECRET_KEY } = config().parsed;

const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequest("Fill correct form"));
		}
		const candidate = await User.findOne({ where: { email } });

		if (candidate) return next(ApiError.badRequest("User is already present"));

		const hashPassword = await bcrypt.hash(password, 5);
		try {
			const user = await User.create({ email, password: hashPassword, role });
			const basket = await Basket.create({ userId: user.id });
			const token = generateJwt(user.id, user.email, user.role);

			return res.json({token});
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user) return next(ApiError.badRequest("User not found"));

		const isValid = bcrypt.compareSync(password, user.password);

		if (!isValid) return next(ApiError.badRequest("Wrong password"));
		
		const token = generateJwt(user.id, user.email, user.role);
		return res.json({token});


	};

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role);
		return res.json({token});
	};

}

export default new UserController();
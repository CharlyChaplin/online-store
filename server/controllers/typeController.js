import { Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TypeController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			const type = await Type.create({ name });
			return res.json(type);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async getAll(req, res) {
		const type = await Type.findAll();
		res.json(type);
	}
}


export default new TypeController();
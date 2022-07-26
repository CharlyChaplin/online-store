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

	async deleteType(req, res, next) {
		try {
			const { name } = req.body;
			const type = await Type.findOne({ where: { name } });

			if (!type) return next(ApiError.badRequest("Type not found"));

			const typeDelete = await Type.destroy({ where: { name } });

			if (typeDelete) {
				return res.json({ message: "Deletion was successfully" });
			} else {
				return next(ApiError.badRequest("Fault while deletion"));
			}
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

}


export default new TypeController();
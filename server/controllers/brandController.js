import { Brand } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BrandController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			const brand = await Brand.create({ name });
			return res.json(brand);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async getAll(req, res) {
		const brand = await Brand.findAll();
		return res.json(brand);
	}
}

export default new BrandController();
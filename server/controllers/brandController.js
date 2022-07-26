import { Brand } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class BrandController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			const id = await Brand.max('id') + 1;
			const resp = await Brand.sequelize.query(`ALTER SEQUENCE brands_id_seq RESTART WITH ${id}`);
			const brand = await Brand.create({ name });
			return res.json(brand);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async getAll(req, res) {
		const brand = await Brand.findAll({order: [
			['id', 'ASC']
		]});
		return res.json(brand);
	}
	
	async deleteBrand(req, res, next) {
		try {
			const { name } = req.body;
			const brand = await Brand.findOne({ where: { name } });

			if (!brand) return next(ApiError.badRequest("Brand not found"));

			const brandDelete = await Brand.destroy({ where: { name } });

			if (brandDelete) {
				return res.json({ message: "Deletion was successfully" });
			} else {
				return next(ApiError.badRequest("Fault while deletion"));
			}
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
}

export default new BrandController();
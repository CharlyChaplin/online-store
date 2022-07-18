import { v4 } from 'uuid';
import path from 'path';
import getPath from '../utils/getPath.js';
import { Device, DeviceInfo } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			let fileName = v4() + '.jpg';
			const dirname = getPath(import.meta.url);
			img.mv(path.resolve(dirname, '..', 'static', fileName));

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName
			});

			if (info) {
				//когда данные вытягиваются из формы(в запросе), они передаются
				//как строка. Поэтому парсим в объект
				info = JSON.parse(info);
				info.forEach(i => {
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					})
				})
			};

			return res.json(device);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async getAll(req, res, next) {
		let { typeId, brandId, limit, page } = req.query;
		page = page || 1;
		limit = limit || 9;
		const offset = limit * page - limit;
		let device;
		try {
			if (typeId && brandId) {
				device = await Device.findAndCountAll({ where: { typeId, brandId, limit, offset } });
			}
			if (!typeId && !brandId) {
				device = await Device.findAndCountAll({ limit, offset });
			}
			if (!typeId && brandId) {
				device = await Device.findAndCountAll({ where: { brandId, limit, offset } });
			}
			if (typeId && !brandId) {
				device = await Device.findAndCountAll({ where: { typeId, limit, offset } });
			}
			return res.json(device);
		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			const device = await Device.findOne({
				where: { id },
				include: [{ model: DeviceInfo, as: 'info' }]
			});
			if (!device) return next(ApiError.badRequest("Device not found"));
			return res.json(device);

		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}

	async deleteOne(req, res, next) {
		try {
			const { id } = req.body;
			const device = await Device.findOne({
				where: { id },
				include: [{ model: DeviceInfo, as: 'info' }]
			});

			if (!device) return next(ApiError.badRequest("Device not found"));
			
			const deviceDelete = await Device.destroy({ where: { id } });
			if (deviceDelete) {
				return res.json({message: "Deletion was successfully"});
			} else {
				return next(ApiError.badRequest("Fault while deletion"));
			}
			

		} catch (err) {
			return next(ApiError.badRequest(err.message));
		}
	}
}


export default new DeviceController();
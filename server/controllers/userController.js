import ApiError from "../error/ApiError.js";

class UserController {
	async registration(req, res) {
		res.status(200).json({message: `You body request: ${req.body.myBody}`});
	};
	
	async login(req, res) {
		res.status(200).json({message: `You body request: ${req.body.myBody}`});
	};
	
	async check(req, res, next) {
		const {id} = req.query;
		if (!id) {
			return next(ApiError.badRequest("No user matches id found"));
		}
		res.json(id);
	};
}

export default new UserController();
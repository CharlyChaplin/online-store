class UserController {
	async registration(req, res) {
		res.status(200).json({message: `You body request: ${req.body.myBody}`});
	};
	
	async login(req, res) {
		res.status(200).json({message: `You body request: ${req.body.myBody}`});
	};
	
	async check(req, res) {
		res.status(200).json({message: "user check method"});
	};
}

export default new UserController();
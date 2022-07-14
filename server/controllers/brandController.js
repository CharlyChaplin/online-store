class BrandController {
	async create(req, res) {
		res.status(200).json({message: `You body request: ${req.body.myBody}`})
	}
	
	async getAll(req, res) {
		res.status(200).json({message: "brand getAll"})
	}
}

export default new BrandController();
class DeviceController {
	async create(req, res) {
		res.status(200).json({ message: `You body request: ${req.body.myBody}` });
	}

	async getAll(req, res) {
		res.status(200).json({ message: "getAll device" });
	}

	async getOne(req, res) {
		const { id } = req.params;
		res.status(200).json({ message: `You body request: I've got id = ${id}` });
	}
}


export default new DeviceController();
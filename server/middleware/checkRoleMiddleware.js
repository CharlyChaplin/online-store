import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

const { SECRET_KEY } = config().parsed;

export default (role) => {
	return (req, res, next) => {
		if (req.method === 'OPTIONS') next();

		try {
			const token = req.headers.authorization.split(' ')[1];
			
			if (!token) res.status(401).json({ message: "User not authorized" });

			const decoded = jwt.verify(token, SECRET_KEY);

			if (decoded.role !== role) return res.json({ message: "Access denied" });

			//добавим в запрос данные, которые были вытащены из токена
			req.user = decoded;
			next();
		} catch (err) {
			res.status(401).json({ message: "Not authorizated" })
		}
	}
}
import axios from "axios";


export const baseURL = process.env.REACT_APP_SERVER_ADR || "http://localhost:5000";

const instance = axios.create({baseURL});

instance.interceptors.request.use(config => {
	config.headers.Authorization = "Bearer " + JSON.parse(window.localStorage.getItem('token'));
	
	return config;
});


export default instance;
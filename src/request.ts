/*
 * @Author: HadesZ
 * @Date: 2024-09-16 21:27:37
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-21 00:50:28
 * @Description:
 */
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import dayjs from "dayjs";
import { CookieJar } from "tough-cookie";

export const jar = new CookieJar();

const request = wrapper(
	axios.create({
		timeout: 30000,
		jar,
	}),
);

request.interceptors.request.use(
	(config) => {
		console.log(`> [${dayjs.utc().format()}] ${config.method.toLocaleUpperCase()} ${config.url}`);
		// Do something before request is sent
		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	},
);

export default request;

/*
 * @Author: HadesZ
 * @Date: 2024-09-16 21:27:37
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-17 00:38:07
 * @Description: 
 */
import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export const jar = new CookieJar();

const request = wrapper(
  axios.create({
    timeout: 30000,
    jar
  })
);

export default request;

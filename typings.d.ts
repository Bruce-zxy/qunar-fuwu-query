/*
 * @Author: HadesZ
 * @Date: 2021-12-30 15:59:15
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-16 21:36:42
 * @Description:
 */
import type { CookieJar } from "tough-cookie";

declare module "koa2-validation";

declare module "axios" {
  interface AxiosRequestConfig {
    jar?: CookieJar;
  }
}
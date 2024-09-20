/*
 * @Author: HadesZ
 * @Date: 2024-09-17 00:02:33
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-20 23:15:51
 * @Description:
 */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default {
  domain: "",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  wxpusher: {
    token: process.env.WXPUSHER_TOKEN,
    orderTopicID: Number(process.env.WXPUSHER_ORDER),
    errorTopicID: Number(process.env.WXPUSHER_ERROR)
  }
};

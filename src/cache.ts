/*
 * @Author: HadesZ
 * @Date: 2024-09-16 23:40:40
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-16 23:50:18
 * @Description:
 */
import fs from "node:fs";
import path from "node:path";
import { Low, JSONFile } from "lowdb";
import mitt from "mitt";

import { jar } from "./request";

type Cache = {
  cookies: Record<string, string>;
};

if (!fs.existsSync(path.join(process.cwd(), "cache.json"))) {
  fs.writeFileSync(path.join(process.cwd(), "cache.json"), `{"cookies": {}}`);
}

export const cacheDB = new Low<Cache>(
  new JSONFile<Cache>(path.join(process.cwd(), "cache.json"))
);

export const emitter = mitt();

cacheDB
  .read()
  .then(() => {
    const keys = Object.keys(cacheDB.data.cookies);
    for (const key of keys) {
      jar.setCookieSync(cacheDB.data.cookies[key], key);
    }
    console.log(`- 共读取到${keys.length}条缓存数据`);
    emitter.emit("bootstrap.start");
  })
  .catch((e) => {
    console.error(`! 读取缓存数据时出错：${e.message}`);
  });

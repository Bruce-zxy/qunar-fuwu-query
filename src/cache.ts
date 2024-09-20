/*
 * @Author: HadesZ
 * @Date: 2024-09-16 23:40:40
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-21 00:06:00
 * @Description:
 */
import fs from "node:fs";
import path from "node:path";
import { Low, JSONFile } from "lowdb";
import { WxPusher } from "@woolson/wx-pusher";

import config from "./config";
import type {
	GqItem,
	PaidanItem,
	QualityCheckItem,
	RefundRecordItem,
	SOPItem,
} from "../typings";

type Cache = {
	gqOrder: GqItem[];
	refundRecord: RefundRecordItem[];
	qualityCheck: QualityCheckItem[];
	paidanList: PaidanItem[];
	gongdanList: any[];
	sopList: SOPItem[];
};

if (!fs.existsSync(path.join(process.cwd(), "cache.json"))) {
	fs.writeFileSync(
		path.join(process.cwd(), "cache.json"),
		`{"gqOrder":[],"refundRecord":[],"qualityCheck":[],"paidanList":[],"gongdanList":[],"sopList":[]}`,
	);
}

export const cacheDB = new Low<Cache>(
	new JSONFile<Cache>(path.join(process.cwd(), "cache.json")),
);

cacheDB.read().catch((e) => {
	console.error(`! 读取缓存数据时出错：${e.message}`);
	WxPusher.msgSend({
		appToken: config.wxpusher.token,
		content: `<p style="color: white;background-color: red">${e.toString()}</p>`,
		summary: e.message,
		topicIds: [config.wxpusher.errorTopicID],
		contentType: 2,
	});
});

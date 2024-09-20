/*
 * @Author: HadesZ
 * @Date: 2024-09-20 17:16:49
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-21 00:50:26
 * @Description:
 */
import dayjs from "dayjs";
import { WxPusher } from "@woolson/wx-pusher";

import config from "./config";
import { getRandomTime, sleep } from "./utils";
import {
	getGQOrder,
	getPaidanList,
	getQualityCheck,
	getRefundRecord,
	getCaptchaData,
	getRequestDomain,
	loginWithPassword,
	getSOPList,
	getGongdanList,
} from "./services";
import { cacheDB } from "./cache";

export const initCookie = async () => {
	try {
		const {
			data: {
				data: { cst },
			},
		} = await getCaptchaData();
		await sleep(getRandomTime(5000));
		await loginWithPassword(cst);
		await sleep(getRandomTime(1000));
		const { data: htmlText } = await getRequestDomain();
		config.domain = htmlText.match(/domain=(\S+)';/)[1];
	} catch (e) {
		console.error(`! 获取Cookie时出错：${e.message}`);
		WxPusher.msgSend({
			appToken: config.wxpusher.token,
			content: `<p style="color: white;background-color: red">${e.toString()}</p>`,
			summary: e.message,
			topicIds: [config.wxpusher.errorTopicID],
			contentType: 2,
		});
	}
};

export const getGQOrderTask = () => {
	const gqRecordParams = new URLSearchParams();
	gqRecordParams.append("domain", config.domain);
	gqRecordParams.append(
		"orderStartDate",
		dayjs().subtract(8, "d").format("YYYY-MM-DD"),
	);
	gqRecordParams.append("orderEndDate", dayjs().format("YYYY-MM-DD"));
	gqRecordParams.append("ticketNoType", "");
	gqRecordParams.append("phoneNum", "");
	gqRecordParams.append("passgenerName", "");
	gqRecordParams.append("orderNo", "");
	gqRecordParams.append("pnr", "");
	gqRecordParams.append("airlineCode", "");
	gqRecordParams.append("flightType[]", "1");
	gqRecordParams.append("flightType[]", "4");
	gqRecordParams.append("flightType[]", "3");
	gqRecordParams.append("flightType[]", "");
	gqRecordParams.append("changeType[]", "1,2");
	gqRecordParams.append("changeType[]", "3");
	gqRecordParams.append("changeType[]", "5");
	gqRecordParams.append("changeType[]", "6");
	gqRecordParams.append("changeType[]", "7");
	gqRecordParams.append("orderUrgentLevel[]", "");
	gqRecordParams.append("gqStatus[]", "0");
	gqRecordParams.append("gqStatus[]", "1");
	gqRecordParams.append("gqStatus[]", "2");
	gqRecordParams.append("gqStatus[]", "3");
	gqRecordParams.append("gqStatus[]", "7");
	gqRecordParams.append("gqStatus[]", "4");
	gqRecordParams.append("gqStatus[]", "5");
	gqRecordParams.append("gqStatus[]", "6");
	gqRecordParams.append("gqStatus[]", "9");
	gqRecordParams.append("gqStatus[]", "");
	gqRecordParams.append("ticketNoStatus", "-1");
	gqRecordParams.append("name", "on");
	gqRecordParams.append("autoAcceptType", "");
	gqRecordParams.append("childDomain", "all");
	gqRecordParams.append("_v", Date.now().toString());
	gqRecordParams.append("limit", "30");
	gqRecordParams.append("pageIndex", "1");
	gqRecordParams.append("start", "0");
	gqRecordParams.append("lastIndex", "1");

	return getGQOrder(gqRecordParams)
		.then((res) => {
			if (res.data.data?.orderList?.length === 0) {
				return res;
			}
			const ids = cacheDB.data.gqOrder.map((item) => item.gqId);
			const newData =
				res.data.data?.orderList.filter((item) => !ids.includes(item.gqId)) ||
				[];
			if (newData?.length === 0) {
				return res;
			}
			WxPusher.msgSend({
				appToken: config.wxpusher.token,
				content: `<code style="color: black;background-color: white">${JSON.stringify(newData, null, 2)}</code>`,
				summary: `机票新增${newData.length}个改签订单`,
				topicIds: [config.wxpusher.orderTopicID],
				contentType: 2,
			});
			cacheDB.data.gqOrder.push(...newData);
			cacheDB.write();
			return res;
		})
		.catch(console.error);
};

export const getRefundRecordTask = () => {
	const refundRecordParams = new URLSearchParams();
	refundRecordParams.append("domain", config.domain);
	refundRecordParams.append("orderStartDate", dayjs().format("YYYY-MM-DD"));
	refundRecordParams.append("orderEndDate", "");
	refundRecordParams.append("emergencyLevel", "127");
	refundRecordParams.append("ticketReturnStatus", "127");
	refundRecordParams.append("status", "125");
	refundRecordParams.append("refundCauseType", "3");
	refundRecordParams.append("flightSearchType", "127");
	refundRecordParams.append("ticketType", "-1");
	refundRecordParams.append("airlineCode", "");
	refundRecordParams.append("orderNo", "");
	refundRecordParams.append("ticketNo", "");
	refundRecordParams.append("pnr", "");
	refundRecordParams.append("contactMobile", "");
	refundRecordParams.append("passengerName", "");
	refundRecordParams.append("special", "127");
	refundRecordParams.append("refundType[]", "0");
	refundRecordParams.append("refundType[]", "1");
	refundRecordParams.append("refundType[]", "2");
	refundRecordParams.append("refundType[]", "3");
	refundRecordParams.append("refundType[]", "-1");
	refundRecordParams.append("childDomain", "all");
	refundRecordParams.append("_v", dayjs().unix().toString());
	refundRecordParams.append("limit", "30");
	refundRecordParams.append("pageIndex", "1");
	refundRecordParams.append("start", "0");

	return getRefundRecord(refundRecordParams)
		.then((res) => {
			if (res.data.data?.orderList?.length === 0) {
				return res;
			}
			const ids = cacheDB.data.refundRecord.map((item) => item.id);
			const newData =
				res.data.data?.orderList.filter((item) => !ids.includes(item.id)) || [];
			if (newData?.length === 0) {
				return res;
			}
			WxPusher.msgSend({
				appToken: config.wxpusher.token,
				content: `<code style="color: black;background-color: white">${JSON.stringify(newData, null, 2)}</code>`,
				summary: `机票新增${newData.length}个退款订单`,
				topicIds: [config.wxpusher.orderTopicID],
				contentType: 2,
			});
			cacheDB.data.refundRecord.push(...newData);
			cacheDB.write();
			return res;
		})
		.catch(console.error);
};

export const getQualityCheckTask = () => {
	const timestamp = dayjs().unix().toString();
	const params = {
		domain: config.domain,
		qualityCheckNo: "",
		orderNo: "",
		curtStatus: -1,
		curtStep: -1,
		createTimeStart: dayjs().subtract(3, "M").format("YYYY-MM-DD"),
		createTimeEnd: dayjs().format("YYYY-MM-DD"),
		problemTypeLevel1: -1,
		problemTypeLevel2: -1,
		fusedomains: "all",
		_v: timestamp,
		limit: 20,
		pageIndex: 1,
		start: 0,
		lastIndex: 1,
		_: timestamp,
	};

	return getQualityCheck(params)
		.then((res) => {
			if (res.data.data?.list?.length === 0) {
				return res;
			}
			const ids = cacheDB.data.qualityCheck.map((item) => item.qualityCheckNo);
			const newData =
				res.data.data?.list.filter(
					(item) => !ids.includes(item.qualityCheckNo),
				) || [];
			if (newData?.length === 0) {
				return res;
			}
			WxPusher.msgSend({
				appToken: config.wxpusher.token,
				content: `<code style="color: black;background-color: white">${JSON.stringify(newData, null, 2)}</code>`,
				summary: `机票新增${newData.length}个质检任务`,
				topicIds: [config.wxpusher.orderTopicID],
				contentType: 2,
			});
			cacheDB.data.qualityCheck.push(...newData);
			cacheDB.write();
			return res;
		})
		.catch(console.error);
};

export const getPaidanListTask = () => {
	const timestamp = dayjs().unix().toString();
	const params = {
		domain: config.domain,
		orderNo: "",
		startDate: dayjs().subtract(14, "d").format("YYYY-MM-DD"),
		endDate: dayjs().format("YYYY-MM-DD"),
		status: -1,
		sourceTypeNew: "all",
		sortType: 4,
		urgencyDegree: 0,
		childDomain: "all",
		_v: timestamp,
		limit: 30,
		pageIndex: 1,
		start: 0,
		lastIndex: 1,
		_: timestamp,
	};

	return getPaidanList(params)
		.then((res) => {
			if (res.data.data?.orderList?.length === 0) {
				return res;
			}
			const ids = cacheDB.data.paidanList.map((item) => item.conversationNo);
			const newData =
				res.data.data?.orderList.filter(
					(item) => !ids.includes(item.conversationNo),
				) || [];
			if (newData?.length === 0) {
				return res;
			}
			WxPusher.msgSend({
				appToken: config.wxpusher.token,
				content: `<code style="color: black;background-color: white">${JSON.stringify(newData, null, 2)}</code>`,
				summary: `机票新增${newData.length}条派单消息`,
				topicIds: [config.wxpusher.orderTopicID],
				contentType: 2,
			});
			cacheDB.data.paidanList.push(...newData);
			cacheDB.write();
			return res;
		})
		.catch(console.error);
};

export const getGongdanListTask = () => {
	const timestamp = dayjs().unix().toString();
	const gongdanParams = new URLSearchParams();
	gongdanParams.append("problemConfigNo1", "-1");
	gongdanParams.append("problemConfigNo2", "-1");
	gongdanParams.append("problemConfigNo3", "-1");
	gongdanParams.append("issueNo", "");
	gongdanParams.append("orderNo", "");
	gongdanParams.append("subStatus", "");
	gongdanParams.append(
		"createTimeBegin",
		dayjs().subtract(60, "d").format("YYYY-MM-DD"),
	);
	gongdanParams.append("createTimeEnd", dayjs().format("YYYY-MM-DD"));
	gongdanParams.append("mlevels[]", "1");
	gongdanParams.append("mlevels[]", "2");
	gongdanParams.append("mlevels[]", "3");
	gongdanParams.append("mlevels[]", "4");
	gongdanParams.append("_v", timestamp);
	gongdanParams.append("limit", "30");
	gongdanParams.append("pageIndex", "1");
	gongdanParams.append("start", "0");
	gongdanParams.append("lastIndex", "1");
	gongdanParams.append("_", timestamp);
	gongdanParams.append("domain", config.domain);

	return getGongdanList(gongdanParams)
		.then((res) => {
			if (res.data.data?.list?.length === 0) {
				return res;
			}
			const ids = cacheDB.data.gongdanList.map((item) => JSON.stringify(item));
			const newData =
				res.data.data?.list.filter(
					(item) => !ids.includes(JSON.stringify(item)),
				) || [];
			if (newData?.length === 0) {
				return res;
			}
			WxPusher.msgSend({
				appToken: config.wxpusher.token,
				content: `<code style="color: black;background-color: white">${JSON.stringify(newData, null, 2)}</code>`,
				summary: `机票新增${newData.length}个工单任务`,
				topicIds: [config.wxpusher.orderTopicID],
				contentType: 2,
			});
			cacheDB.data.gongdanList.push(...newData);
			cacheDB.write();
			return res;
		})
		.catch(console.error);
};

export const getSOPListTask = () => {
	const timestamp = dayjs().unix().toString();
	const params = {
		domain: config.domain,
		createDateStart: dayjs().subtract(29, "d").format("YYYY-MM-DD"),
		createDateEnd: dayjs().format("YYYY-MM-DD"),
		bizType: "",
		eventType1: "",
		eventType: "",
		orderNo: "",
		eventNo: "",
		operator: "",
		airlineCode: "",
		departureDateStart: "",
		departureDateEnd: "",
		overTimeLimit: 0,
		immediateProcess: 0,
		businessNo: "",
		eventSource: 0,
		businessTimeBegin: "",
		businessTimeEnd: "",
		email: "",
		curPage: 1,
		_v: timestamp,
		limit: 15,
		pageIndex: 1,
		start: 0,
		lastIndex: 1,
		_: timestamp,
	};

	return getSOPList(params)
		.then((res) => {
			if (res.data.data?.list?.length === 0) {
				return res;
			}
			const ids = cacheDB.data.sopList.map((item) => item.eventNo);
			const newData =
				res.data.data?.list.filter((item) => !ids.includes(item.eventNo)) || [];
			if (newData?.length === 0) {
				return res;
			}
			WxPusher.msgSend({
				appToken: config.wxpusher.token,
				content: `<code style="color: black;background-color: white">${JSON.stringify(newData, null, 2)}</code>`,
				summary: `机票新增${newData.length}条SOP消息`,
				topicIds: [config.wxpusher.orderTopicID],
				contentType: 2,
			});
			cacheDB.data.sopList.push(...newData);
			cacheDB.write();
			return res;
		})
		.catch(console.error);
};

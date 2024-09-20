/*
 * @Author: HadesZ
 * @Date: 2024-09-16 23:13:06
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-20 23:45:08
 * @Description:
 */
import config from "./config";
import request from "./request";
import slider from "./slider";

export const getCaptchaData = () =>
	request.post(
		"https://vercode.qunar.com/inner/captcha/snapshot",
		{
			data: slider(),
			orca: 2,
			appCode: "register_pc",
			cs: "pc",
		},
		{
			headers: {
				Origin: "https://user.qunar.com",
				Referer: "https://user.qunar.com/",
				Cookie: `QN1=0000f10027c464f592f0469b; ctt_june=1683616182042##iK3wasXsWUPwawPwas3OERDwWDX8VPGhaKkTEPaNVKiGVRaOXKEGEKawWsD%3DiK3siK3saKgwWSXNaKg%3Dasj8ahPwaUvt; QN271AC=register_pc; QN238=zh_cn; QN300=organic; QN99=4525; QN271SL=3dcb3a5265ff5588f0146d873ae7ecee; QN271RC=3dcb3a5265ff5588f0146d873ae7ecee; csrfToken=GjbriyGoLA6XyByLffhqjWTwb5QAzBtR; _i=""; ariaDefaultTheme=undefined; ctf_june=1683616182042##iK3waStsahPwawPwa%3Dj8asihEKa%3DWKjnXS2maPa%3DERj8EPj8ERP%2BEPWha2POiK3siK3saKgwWSXNWstwaKaOWwPwaUvt; cs_june=d6e66cd6ba571c2fdbf35da91c57672e25389a384fa0ee0e6fad6c489e1b4b30e2add11a1d424ea13932d14cf924b42a5489fc962754696afa0ae430881daa8cb17c80df7eee7c02a9c1a6a5b97c1179d58033ef427672e22f5e8c9d8bc44e8a5a737ae180251ef5be23400b098dd8ca`,
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			},
		},
	);

export const loginWithPassword = (cst: string) =>
	request.post(
		"https://user.qunar.com/weblogin/password",
		{
			piccoloT: "login_register_pc",
			username: config.username,
			password: config.password,
			prenum: "86",
			type: "3",
			source: "",
			remember: true,
			slideToken: cst,
			appcode: "register_pc",
			loginSource: 1,
			captchaType: "",
			usersource: "",
			ret: "https://www.qunar.com/",
			ref: "",
			business: "",
			pid: "",
			originChannel: "",
			activityCode: "",
		},
		{
			headers: {
				Origin: "https://user.qunar.com",
				Referer:
					"https://user.qunar.com/passport/login.jsp?ret=http%3A%2F%2Ffuwu.qunar.com%2Fuserpass/clean",
				"Content-Type": "application/json;charset=UTF-8",
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			},
		},
	);

export const getRequestDomain = () =>
	request.get<string>("http://fuwu.qunar.com/userpass/clean", {
		headers: {
			Origin: "https://user.qunar.com",
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		},
	});

export const getGQOrder = (params: URLSearchParams) =>
	request.post("http://fuwu.qunar.com/gaiqian/ajaxGQOrderList.json", params, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			Origin: "http://fuwu.qunar.com",
			Referer: `http://fuwu.qunar.com/uipage/gqOrderListForOta?domain=${config.domain}&_=${params.get(
				"_v",
			)}`,
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		},
	});

export const getRefundRecord = (params: URLSearchParams) =>
	request.post(
		"http://fuwu.qunar.com/orderadmin/returnticket/orderlist",
		params,
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				Origin: "http://fuwu.qunar.com",
				Referer: `http://fuwu.qunar.com/uipage/returnticket?domain=${config.domain}`,
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			},
		},
	);

export const getQualityCheck = (params) =>
	request.get("http://fuwu.qunar.com/qualityCheck/agentTask/agentQCTaskQuery", {
		params,
		headers: {
			Host: "fuwu.qunar.com",
			Referer: `http://fuwu.qunar.com/qualityui/list/qualityCheckTask?domain=${config.domain}&_=${params._v}`,
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		},
	});

export const getPaidanList = (params) =>
	request.get("http://fuwu.qunar.com/qbcp/sink/conversation/list", {
		params,
		headers: {
			Host: "fuwu.qunar.com",
			Referer: `http://fuwu.qunar.com/uipage/qnfMessage/otaList?domain=${config.domain}&_=${params._v}`,
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		},
	});

export const getGongdanList = (params: URLSearchParams) =>
	request.get("http://fuwu.qunar.com/gongdan/complaint_task/agent_list", {
		params,
		headers: {
			Host: "fuwu.qunar.com",
			Referer: `http://fuwu.qunar.com/gdui/v2list/agentTaskList?domain=${config.domain}&_=${params.get(
				"_v",
			)}`,
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		},
	});

export const getSOPList = (params) =>
	request.get("http://fuwu.qunar.com/eventui/dispatch/queryByConditions", {
		params,
		headers: {
			Host: "fuwu.qunar.com",
			Referer: `http://fuwu.qunar.com/uipage/event/taskScheduleList?domain=${config.domain}&_=${params._v}`,
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		},
	});

/*
 * @Author: HadesZ
 * @Date: 2024-09-20 19:48:16
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-21 00:53:07
 * @Description:
 */
import reInterval from "reinterval";

import {
	getGongdanListTask,
	getGQOrderTask,
	getPaidanListTask,
	getQualityCheckTask,
	getRefundRecordTask,
	getSOPListTask,
	initCookie,
} from "./task";
import { getRandomTime } from "./utils";

const loginInterval = 2 * 60 * 60 * 1000;
const orderInterval = 2 * 60 * 1000;

const loginSchedule = reInterval(() => {
	initCookie();
	loginSchedule.reschedule(getRandomTime(loginInterval));
}, getRandomTime(loginInterval));

const getGQOrderSchedule = reInterval(() => {
	getGQOrderTask();
	getGQOrderSchedule.reschedule(getRandomTime(orderInterval));
}, getRandomTime(orderInterval));

const getRefundRecordSchedule = reInterval(() => {
	getRefundRecordTask();
	getRefundRecordSchedule.reschedule(getRandomTime(orderInterval));
}, getRandomTime(orderInterval));

const getQualityCheckSchedule = reInterval(() => {
	getQualityCheckTask();
	getQualityCheckSchedule.reschedule(getRandomTime(orderInterval));
}, getRandomTime(orderInterval));

const getPaidanListSchedule = reInterval(() => {
	getPaidanListTask();
	getPaidanListSchedule.reschedule(getRandomTime(orderInterval));
}, getRandomTime(orderInterval));

const getSOPListSchedule = reInterval(() => {
	getSOPListTask();
	getSOPListSchedule.reschedule(getRandomTime(orderInterval));
}, getRandomTime(orderInterval));

const getGongdanListSchedule = reInterval(() => {
	getGongdanListTask();
	getGongdanListSchedule.reschedule(getRandomTime(orderInterval));
}, getRandomTime(orderInterval));

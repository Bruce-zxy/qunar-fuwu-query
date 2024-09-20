/*
 * @Author: HadesZ
 * @Date: 2021-12-30 15:59:15
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-21 00:03:15
 * @Description:
 */
import type { CookieJar } from "tough-cookie";

declare module "koa2-validation";

declare module "axios" {
	interface AxiosRequestConfig {
		jar?: CookieJar;
	}
}

type RefundRecordItem = {
	gqRefund: null;
	id: number;
	orderId: number;
	refundCause: null;
	refundType: null;
	qmqCreateTime: null;
	autoRefundFailureReason: null;
	firstAutoRefund: number;
	autoConfirmRefund: number;
	orderNo: string;
	domain: null;
	childDomain: null;
	qncOrderNo: null;
	flightType: string;
	createTime: string;
	pnr: string;
	childPnr: string;
	allPrices: number;
	status: string;
	flightTypeString: string;
	orderStatus: string;
	repeatRefundStatusStr: null;
	flightSegmentList: FlightSegmentList1[];
	passengerList: PassengerList[];
	passengerCount: number;
	reconcileTimeString: string;
	repeatRefundStatus: null;
	repeatRefundApplyTime: null;
	confirmPnrDelayStatus: null;
	lastTime: null;
	applyTime: string;
	operation: Operation[];
	contact: null;
	contactMob: null;
	level: number;
	orderLevelType: string;
	orderUrgentLevelType: null;
	finalRefundType: string;
	autoRefund: string;
	trustedUserRefund: number;
	autoRefundShowString: string;
	orderLevelTypeString: null;
	orderLevelTypeInfo: string;
	reminderRefundCounts: number;
	lockMan: string;
	childrenCount: number;
	reminderCounts: number;
	lastReminderTime: null;
	errortype: number;
	fzStatus: number;
	losses: string;
	reconcileTime: null;
	productType: null;
	distributeType: number;
	urgeTicketTimeRemain: null;
	latestTicketIssueTime: null;
	ticketRemainder: null;
	selfQuotedPriceRemark: null;
	refundCauseType: number;
	isAutoRefundXcd: null;
	riskOrder: boolean;
	forceDeductTime: null;
	ticketUnCheckedRisk: boolean;
	refundTypeDesc: null;
	refundPrice: null;
	refundFee: null;
	ticketNums: null;
	applyTimeLevelStr: null;
	applyTimeLevel: number;
	orderType: null;
	lastUpdateTime: null;
	policyType: number;
	buttonMap: null;
	locked: boolean;
	qnc: boolean;
	wrapperChargeType: null;
};

interface Operation {
	type: string;
	name: string;
	url: string;
	refresh: boolean;
	msg: null;
}

interface PassengerList {
	id: number;
	orderNo: string;
	name: string;
	cardType: string;
	cardNum: string;
	ageType: string;
	ticketNo: string;
	ticketReturnStatus: string;
	ticketReturnStatusString: string;
	domain: null;
	createTime: null;
	updateTime: null;
}

interface FlightSegmentList1 {
	id: number;
	orderId: number;
	orderNo: string;
	flightNum: string;
	departureDay: string;
	departureTime: string;
	departureAirport: string;
	arrivalTime: string;
	arrivalAirport: string;
	policyFid: string;
	policyId: number;
	policyURL: null;
	policyType: null;
	policyCode: string;
	cabin: null;
	airlineCompany: string;
	realFlightNum: null;
}

type GqItem = {
	gqId: number;
	gqStatus: number;
	orderNo: string;
	createTime: number;
	createTimeStr: string;
	gqFee: number;
	upgradeFee: number;
	ticketPriceDifference: number;
	nOrderNo: string;
	nOrderDomain: string;
	orderUrgentLevelType: string;
	orderLevelTypeString: string;
	orderLevelTypeCode: number;
	passengerCount: number;
	domain: string;
	from: null;
	flightSegmentList: FlightSegmentList[];
	gqApplyTime: string;
	lockMan: null;
	operation: Operation[];
	allPrices: number;
	flightTypeStr: string;
	flightQqStatusStr: string;
	selfQuotedPriceRemark: null;
	charged: null;
	operateLimitTiming: null;
	fallBackTime: number;
	ttsPassengerList: TtsPassengerList[];
	gqUrgentSortParam: GqUrgentSortParam;
	lock: boolean;
};

interface GqUrgentSortParam {
	overtime: number;
	nearOverTime: number;
	countCabin: number;
	doudiTime: number;
	applyTime: number;
	gaiqianStatus: number;
	orderUrgentLevelCompareType: string;
}

interface TtsPassengerList {
	id: number;
	orderId: number;
	name: string;
	cardType: string;
	cardNum: string;
	ageType: number;
	bxCount: number;
	totalPrice: number;
	eTicketNum: string;
	ticketStatus: number;
	ticketStatusInfo: string;
	parentId: number;
	birthday: string;
	gender: boolean;
	price: number;
	priceTypeCode: number;
	tehuiProfit: number;
	passengerKey: number;
	priceType: string;
	childPriceType: boolean;
	passengerType: string;
}

interface FlightSegmentList {
	id: number;
	gqId: number;
	departureDay: string;
	departureTime: string;
	flightNum: string;
	gqFee: string;
	upgradeFee: string;
	dispatchGqFee: string;
	dispatchUpgradeFee: string;
	ticketPriceDifference: string;
	cabin: null;
	ccabin: null;
	icabin: null;
	flightType: string;
	passengerCount: number;
	gqFlightTime: null;
	arrivalDay: null;
	arrivalTime: null;
	uFee: null;
	uFeeForDispatch: null;
	arrAirportCode: string;
	depAirportCode: string;
	dispatchGqPrice: null;
	dispatchUpgradePrice: null;
	chooseType: number;
	gqAllFeeForFlight: string;
	gqAllPriceForFlight: string;
	flightTypeDesc: string;
	gqAllFee: string;
	flightTypeCode: number;
}

type PaidanItem = {
	conversationNo: string;
	orderNo: string;
	updateTime: string;
	infoType: string;
	secondType: string;
	infoContent: string;
	handleStatus: string;
	status: number;
	lockMan: string;
	operation: Operation[];
	qcspTaskStatus: number;
	urgencyDegree: number;
	dueTime: number;
	totalTime: number;
	isFromEvent: number;
};

type QualityCheckItem = {
	orderNo: string;
	qualityCheckNo: string;
	createTime: string;
	problemTypeStr: string;
	curStatusStr: string;
	curStepStr: string;
	latestOperator: string;
	compensateMoney: number;
	penaltyMoney: number;
	operators: string;
	remainTime: string;
	operUnable: boolean;
	operation: string;
	qualityCheckUrl: string;
};

type SOPItem = {
	orderNo: string;
	eventNo: string;
	eventType1Desc: string;
	eventTypeDesc: string;
	departureTime: string;
	createTime: string;
	eventStatus: string;
	activeDesc: string;
	totalTime: string;
	priority: string;
	userLevel: null;
	processLimit: string;
	reserveLimit: string;
	dutyOperator: string;
	dutyOperatorName: string;
	source: string;
	airlineCode: string;
	remark: null;
	remindTime: null;
	dueTime: string;
	allowChangeOperator: boolean;
	actions: function[][];
	orderNoBizType: number;
	businessNo: string;
	eventType1: number;
	eventType: number;
	userAttribute: number;
	userAttributeDesc: string;
};

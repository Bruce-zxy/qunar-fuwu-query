/*
 * @Author: HadesZ
 * @Date: 2022-12-16 12:54:40
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-17 01:23:24
 * @Description:
 */
import dayjs from "dayjs";
import { emitter } from "./cache";
import {
  getCaptchaData,
  getGQOrder,
  getRefundRecord,
  getRequestDomain,
  loginWithPassword
} from "./services";
import { sleep } from "./utils";

const bootstrap = async () => {
  try {
    const {
      data: {
        data: { cst }
      }
    } = await getCaptchaData();

    await sleep(3000);

    await loginWithPassword(cst);

    await sleep(3000);

    const { data: htmlText } = await getRequestDomain();
    const domain = htmlText.match(/domain=(\S+)';/)[1];

    console.log("- Domain:", domain);
    await sleep(3000);

    const gqRecordParams = new URLSearchParams();
    gqRecordParams.append("domain", domain);
    gqRecordParams.append(
      "orderStartDate",
      dayjs().subtract(7, "d").format("YYYY-MM-DD")
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
    gqRecordParams.append("gqStatus[]", "1");
    gqRecordParams.append("gqStatus[]", "3");
    gqRecordParams.append("gqStatus[]", "7");
    gqRecordParams.append("gqStatus[]", "");
    gqRecordParams.append("ticketNoStatus", "-1");
    gqRecordParams.append("autoAcceptType", "");
    gqRecordParams.append("childDomain", "all");
    gqRecordParams.append("_v", Date.now().toString());
    gqRecordParams.append("limit", "30");
    gqRecordParams.append("pageIndex", "1");
    gqRecordParams.append("start", "0");
    gqRecordParams.append("lastIndex", "1");

    const { data: GQRecord } = await getGQOrder(gqRecordParams);

    console.log("/gaiqian/ajaxGQOrderList.json\n", GQRecord);

    await sleep(3000);

    const refundRecordParams = new URLSearchParams();
    refundRecordParams.append("domain", domain);
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
    refundRecordParams.append("lastStart", "33122");
    refundRecordParams.append("lastEnd", "33122");
    refundRecordParams.append("lastIndex", "1");

    const { data: refundRecord } = await getRefundRecord(refundRecordParams);

    console.log("/orderadmin/returnticket/orderlist\n", refundRecord);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 读取完缓存以后开始执行主程序
 */
emitter.on("bootstrap.start", bootstrap);

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosError, AxiosResponse } from "axios";
import { AppDataSource } from "../database";
import { EnumStatusOrder, Order } from "../entities/order.entity";
import { EnumPaymentMethod, Payment } from "../entities/payment.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";
import QueryString from "qs";
import paypal from "paypal-rest-sdk";

const orderRepo = AppDataSource.getRepository(Order);
const paymentRepo = AppDataSource.getRepository(Payment);

export const selectMethod = async (
  order_id: number,
  method: EnumPaymentMethod
) => {
  if (!method) return BadRequestError("method not select");
  const order = await orderRepo.findOne({
    where: { id: order_id },
    relations: {
      payment: true,
    },
  });
  if (!order) return BadRequestError("order not found");
  const payment = await paymentRepo.findOneBy({ id: order.payment.id });
  if (!payment) return BadRequestError("payment data error");
  return (await paymentRepo.update(
    { id: order.payment.id },
    { method: Number(EnumPaymentMethod[method]) }
  ))
    ? success()
    : failed();
};

export const updateStatus = async (order_id: number) => {
  const order = await orderRepo.findOne({
    where: {
      id: order_id,
    },
    relations: {
      payment: true,
    },
  });
  if (!order) return BadRequestError("order not found");
  if (order.status !== EnumStatusOrder.PENDING)
    return BadRequestError("payment error");
  return await markAsPaid(order.payment);
};

export const markAsPaid = async (payment: Payment) => {
  return !payment.is_paid &&
    (await paymentRepo.update({ id: payment.id }, { is_paid: true })).affected
    ? success()
    : failed;
};

export const markAsRefund = async (payment: Payment) => {
  return (
    await paymentRepo.update(
      { id: payment.id },
      { is_paid: false, method: EnumPaymentMethod.RETURNED }
    )
  ).affected
    ? success()
    : failed();
};

// paypal method
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
const environment = process.env.ENVIRONMENT || "sandbox";

paypal.configure({
  mode: environment, //sandbox or live
  client_id: `${PAYPAL_CLIENT_ID}`,
  client_secret: `${PAYPAL_APP_SECRET}`,
});

export const generatePaypalAccessToken = async () => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64"
  );

  try {
    const data = QueryString.stringify({
      grant_type: "client_credentials",
    });
    const res: AxiosResponse = await axios({
      method: "post",
      url: `/v1/oauth2/token`,
      data,
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return res.data.access_token;
  } catch (error) {
    const err = error as AxiosError;
    return BadRequestError(
      `${err.response?.statusText}: ${err.message}`,
      err.response?.status
    );
  }
};

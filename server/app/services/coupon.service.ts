import { AppDataSource } from "../database";
import { Coupon, EnumTypeCoupon } from "../entities/coupon.entity";
import { EnumStatusOrder, Order } from "../entities/order.entity";
import { Payment } from "../entities/payment.entity";
import { BadRequestError, isError } from "../utils/error";
import { failed, success } from "../utils/response";
// import { CouponCondition } from "../entities/couponCondition.entity";

const generateCode = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

interface exprire {
  start_date: string;
  end_date: string;
}

interface coupon extends exprire {
  code: string;
  type: EnumTypeCoupon;
  value: number;
  number: number;
}

const couponRepo = AppDataSource.getRepository(Coupon);
const orderRepo = AppDataSource.getRepository(Order);
const paymentRepo = AppDataSource.getRepository(Payment);
// const couponConditionRepo = AppDataSource.getRepository(CouponCondition);

export const createNew = async (
  number: number,
  length: number,
  value: number,
  duplicate: number,
  expired: exprire,
  type: EnumTypeCoupon
) => {
  const coupons: coupon[] = [];
  for (let i = 0; i < duplicate; i++) {
    const code = generateCode(length);
    coupons.push({
      code,
      type: Number(EnumTypeCoupon[type]),
      value,
      number,
      ...expired,
    });
  }

  const result: Coupon[] = [];
  await Promise.all(
    coupons.map(async (coupon) => {
      result.push({
        ...(await couponRepo.save(
          couponRepo.create({
            ...coupon,
          })
        )),
      });
    })
  );

  return result;
};

const checkCoupon = async (code: string) => {
  const coupon = await couponRepo.findOne({
    where: {
      code
    }
  });

  if(!coupon) return BadRequestError("coupon not found", 404);
  if(!coupon.active) return BadRequestError("coupon not active");
  if(!coupon.number) return BadRequestError("coupon out of quantity");
  const start_date = new Date(coupon.start_date).getTime();
  const end_date = new Date(coupon.end_date).getTime();
  const now = new Date().getTime();
  if(start_date > now || end_date < now) return BadRequestError("you cannot apply coupon now");

  return coupon;
}

export const applyCoupon = async (code: string, order_id: number) => {
  const coupon = await checkCoupon(code);
  if(isError(coupon)) return coupon;
  const order = await orderRepo.findOne({
    where: {
      id: order_id
    },
    relations: {
      payment: true,
      coupon: true
    }
  });
  if(!order || !order_id) return BadRequestError("order not found", 404);
  if(order.status !== EnumStatusOrder.PENDING) return BadRequestError("order alrealdy paid");
  if(order.coupon) return BadRequestError("order alrealdy apply coupon");
  const payment = await paymentRepo.findOne({
    where: {
      id: order.payment.id
    }
  });
  if(!payment) return BadRequestError("error when retrieve payment");
  if(payment.is_paid) return BadRequestError("payment already paid");
  switch(coupon.type){
    case EnumTypeCoupon.AMOUNT: {
      const value = (Number(payment.amount)-coupon.value) >= 0 ? (Number(payment.amount)-coupon.value) : 0;
      const status = (await paymentRepo.update({
        id: payment.id
      }, { amount: `${value}` })).affected;
      if(status) {
        await orderRepo.update({ id: order_id }, { coupon });
        await couponRepo.update({ id: coupon.id }, { number: coupon.number-1 });
      }
      return status ? success() : failed();
    }
    case EnumTypeCoupon.PERCENT: {
      const value = (Number(payment.amount)-(Number(payment.amount)/100*coupon.value)) >= 0 ? (Number(payment.amount)-(Number(payment.amount)/100*coupon.value)) : 0;
      const status = (await paymentRepo.update({
        id: payment.id
      }, { amount: `${value}` })).affected;
      if(status) {
        await orderRepo.update({ id: order_id }, { coupon });
        await couponRepo.update({ id: coupon.id }, { number: coupon.number-1 });
      }
      return status ? success() : failed();
    }
    default: return;
  }
}

export const clearCoupon = async (order_id: number) => {
  const order = await orderRepo.findOne({
    where: {
      id: order_id
    },
    relations: {
      payment: true,
      coupon: true
    }
  });
  if(!order || !order_id) return BadRequestError("order not found", 404);
  if(order.status !== EnumStatusOrder.PENDING) return BadRequestError("order alrealdy paid");
  if(!order.coupon) return BadRequestError("order not apply coupon yet");
  const payment = await paymentRepo.findOne({
    where: {
      id: order.payment.id
    }
  });
  const coupon = await couponRepo.findOne({
    where: {
      id: order.coupon.id
    }
  });
  if(!coupon) return BadRequestError("cannot retrieve coupon");
  if(!payment) return BadRequestError("error when retrieve payment");
  if(payment.is_paid) return BadRequestError("payment already paid");
  switch(coupon.type){
    case EnumTypeCoupon.AMOUNT: {
      const value = (Number(payment.amount)+coupon.value);
      const status = (await paymentRepo.update({
        id: payment.id
      }, { amount: `${value}` })).affected;
      if(status) {
        await orderRepo.update({ id: order_id }, { coupon: null });
        await couponRepo.update({ id: coupon.id }, { number: coupon.number+1 });
      }
      return status ? success() : failed();
    }
    case EnumTypeCoupon.PERCENT: {
      const value = ((Number(payment.amount)*100/coupon.value));
      const status = (await paymentRepo.update({
        id: payment.id
      }, { amount: `${value}` })).affected;
      if(status) {
        await orderRepo.update({ id: order_id }, { coupon: null });
        await couponRepo.update({ id: coupon.id }, { number: coupon.number+1 });
      }
      return status ? success() : failed();
    }
    default: return;
  }
}


export const getAllCoupon = async () => {
  return (await couponRepo.find()).map(e => {
    const start_d = e.start_date.split('/');
    const end_d = e.end_date.split('/');
    return {
      ...e,
      type: EnumTypeCoupon[e.type],
      start_date: `${start_d[1]}/${start_d[0]}/${start_d[2]}`,
      end_date: `${end_d[1]}/${end_d[0]}/${end_d[2]}`
    }
  });
}
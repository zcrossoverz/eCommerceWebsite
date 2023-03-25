import { AppDataSource } from "../database";
import { Coupon, EnumTypeCoupon } from "../entities/coupon.entity";
import { BadRequestError } from "../utils/error";
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

export const checkCoupon = async (code: string) => {
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

  return {
    can: true
  };
}
import { AppDataSource } from "../database";
import { Feedback } from "../entities/feedback.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { BadRequestError, isError } from "../utils/error";
import { failed, success } from "../utils/response";
import * as workQueueServices from "../services/workqueue.service";
import { EnumWorkQueueType } from "../entities/workQueue.entity";
import { canRate } from "./product.service";

const feedbackRepo = AppDataSource.getRepository(Feedback);
const userRepo = AppDataSource.getRepository(User);
const productRepo = AppDataSource.getRepository(Product);

interface data_feedback {
  rate: number;
  comment: string;
}

export const createFeedback = async (
  product_id: number,
  user_id: number,
  rate: number,
  comment: string | null = null
) => {
  const product = await productRepo.findOneBy({ id: product_id });
  const user = await userRepo.findOneBy({ id: user_id });
  if (!product) return BadRequestError("product not found");
  if (!user) return BadRequestError("user not found");
  const can_rate = await canRate(product_id, user_id);
  if (!can_rate.can_rate || can_rate.is_done)
    return BadRequestError("you cannot rate this product");
  await workQueueServices.markAsDone(product, user, EnumWorkQueueType.RATE);
  const rs = await feedbackRepo.save(
    feedbackRepo.create({
      rate: rate,
      comment: comment ? comment : "",
      product,
      user,
    })
  );
  await syncRate(product_id);
  return rs;
};

export const updateFeedback = async (
  product_id: number,
  user_id: number,
  data: data_feedback
) => {
  const can_rate = await canRate(product_id, user_id);
  if (can_rate.can_rate && can_rate.is_done) {
    const feedback = await feedbackRepo.findOneBy({
      product: {
        id: product_id,
      },
      user: {
        id: user_id,
      },
    });
    if (!feedback) return BadRequestError("feedback not found");
    if (!data.comment && !data.rate)
      return BadRequestError("rate and comment empty");
    const rs = (await feedbackRepo.update({ id: feedback.id }, { ...data }))
      .affected
      ? success()
      : failed();
    await syncRate(product_id);
    return rs;
  }
  return BadRequestError("you cannot update rate for this product");
};

export const deleteFeedback = async (id: number) => {
  const product = await feedbackRepo.findOne({
    where: {
      id,
    },
    relations: {
      product: true,
    },
  });
  const rs = (await feedbackRepo.delete({ id })).affected
    ? success()
    : failed();
  if (product) await syncRate(product.id);
  return rs;
};

export const getFeedbackByProduct = async (product_id: number) => {
  const product = await productRepo.findOne({
    where: {
      id: product_id,
    },
    relations: {
      feedbacks: {
        user: true,
      },
    },
  });
  if (!product) return BadRequestError("product not found");
  const feedbacks = product.feedbacks;
  return feedbacks.length
    ? {
        rate: Math.ceil(
          feedbacks.reduce((acc, cur) => acc + cur.rate, 0) / feedbacks.length
        ),
        data: feedbacks.map((e) => {
          return {
            ...e,
          };
        }),
      }
    : {
        rate: 0,
        data: [],
      };
};

export const syncRate = async (product_id: number) => {
  const feedbacks = await getFeedbackByProduct(product_id);
  return (
    await productRepo.update(
      { id: product_id },
      { rate: isError(feedbacks) ? "0" : `${Number(feedbacks.rate)}` }
    )
  ).affected
    ? success()
    : failed();
};

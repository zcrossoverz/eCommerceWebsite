import { AppDataSource } from "../database";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { EnumWorkQueueType, WorkQueue } from "../entities/workQueue.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";

const workRepo = AppDataSource.getRepository(WorkQueue);

export const addRemindFeedback = async (product: Product, user: User) => {
  return !(await workRepo.findOneBy({
    product: {
      id: product.id,
    },
    user: {
      id: user.id,
    },
  }))
    ? await workRepo.save(
        workRepo.create({
          type: EnumWorkQueueType.RATE,
          product,
          user,
        })
      )
    : BadRequestError("user already rate this product");
};

export const markAsDone = async (product: Product, user: User, type: EnumWorkQueueType) => {
    const work = workRepo.findBy({
        product:{
            id: product.id
        },
        user:{
            id: user.id
        }
    });
    const data = (await work).find(work => work.type === type);
    return (await workRepo.update({
        id: data?.id
    },
    {
        is_done: true
    })).affected ? success() : failed()
};

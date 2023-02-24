// import { AppDataSource } from "../database";
import { StatusOrder } from "../entities/order.entity";
// import { Order } from "../entities/order.entity";
// import { BadRequestError } from "../utils/error";
// import { userRepository } from "./user.service";

// const orderRepository = AppDataSource.getRepository(Order);

export const create = async (user_id: number, status: StatusOrder) => {
    // const user = await userRepository.findOneBy({id:user_id});
    // if(!user) return BadRequestError("user not found");
    // const new_order = orderRepository.create({
    //     user,
    // });
}
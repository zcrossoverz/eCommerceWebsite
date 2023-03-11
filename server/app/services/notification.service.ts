/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AppDataSource } from "../database"
import { EnumTypeNotify, Notification } from "../entities/notification.entity"
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { BadRequestError } from "../utils/error";

const notiRepo = AppDataSource.getRepository(Notification);
const orderRepo = AppDataSource.getRepository(Order);
const userRepo = AppDataSource.getRepository(User);

const generateContent = async (type: EnumTypeNotify, id: number) => {
    
    switch (Number(EnumTypeNotify[type])){
        case EnumTypeNotify.NEW_ORDER: {
            const order = await orderRepo.findOneBy({ id });
            return `Cám ơn bạn đã đặt hàng, mã đơn hàng của bạn là #${order?.id}. Chúng tôi sẽ xử lý sớm nhất có thể.`;
        }
    }
    return;
}

export const addNewNoti = async (type: EnumTypeNotify, id: number, user_id: number) => {
    if(!type) return BadRequestError("type empty");
    if(!(type in EnumTypeNotify)) return BadRequestError("type not valid");
    const user = await userRepo.findOneBy({ id: user_id });
    if(!user) return BadRequestError("user not found");
    const new_noti = await notiRepo.save(notiRepo.create({
        type,
        content: await generateContent(type, id),
        user: user
    }));
    const unread = user.unread_message+1;
    await userRepo.update({ id: user.id }, { unread_message: unread });
    return new_noti;
}
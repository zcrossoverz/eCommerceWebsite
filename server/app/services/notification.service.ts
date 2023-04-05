/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AppDataSource } from "../database";
import { EnumTypeNotify, Notification } from "../entities/notification.entity";
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";

const notiRepo = AppDataSource.getRepository(Notification);
const orderRepo = AppDataSource.getRepository(Order);
const userRepo = AppDataSource.getRepository(User);

const generateContent = async (type: EnumTypeNotify, id: number) => {
  switch (Number(type)) {
    case EnumTypeNotify.NEW_ORDER: {
      const order = await orderRepo.findOneBy({ id });
      return `Cám ơn bạn đã đặt hàng, mã đơn hàng của bạn là #${order?.id}. Chúng tôi sẽ xử lý sớm nhất có thể.`;
    }
    case EnumTypeNotify.SHIPPED: {
      const order = await orderRepo.findOneBy({ id });
      return `Đơn hàng #${order?.id} của bạn đã được bàn giao cho đơn vị vận chuyển.`;
    }
    case EnumTypeNotify.COMPLETED: {
      const order = await orderRepo.findOneBy({ id });
      return `Đơn hàng #${order?.id} đã được giao thành công, hãy để lại đánh giá nào.`;
    }
    case EnumTypeNotify.CANCELLED: {
      const order = await orderRepo.findOneBy({ id });
      return `Chúng tôi đã hủy đơn hàng #${order?.id} của bạn.`;
    }
  }
  return;
};

export const addNewNoti = async (
  type: EnumTypeNotify,
  id: number,
  user_id: number
) => {
  if (!type) return BadRequestError("type empty");
  if (!(type in EnumTypeNotify)) return BadRequestError("type not valid");
  const user = await userRepo.findOneBy({ id: user_id });
  if (!user) return BadRequestError("user not found");
  const new_noti = await notiRepo.save(
    notiRepo.create({
      type,
      content: await generateContent(type, id),
      user: user,
    })
  );
  const unread = user.unread_message + 1;
  await userRepo.update({ id: user.id }, { unread_message: unread });
  return new_noti;
};

export enum getType {
  UNREAD,
  ALL,
}

export const getNoti = async (user_id: number, type: getType) => {
  const user = await userRepo.findOne({
    relations: {
      notifications: true,
    },
    where: { id: user_id },
  });
  if (!user) return BadRequestError("user not found");

  if (type) {
    const noti: Notification[] = [];
    await Promise.all(
      user.notifications.map(async (e) => {
        noti.push(e);
        if (!e.is_read) return await markAsRead(e);
        return;
      })
    );
    await userRepo.update({
        id: user_id
    }, {
        unread_message: 0
    });
    return {
      data: noti.map((e) => e),
    };
  } else {
    const noti: Notification[] = [];
    await Promise.all(
      user.notifications.map(async (e) => {
        if (e.is_read) return;
        noti.push(e);
        return await markAsRead(e);
      })
    );
    await userRepo.update({
        id: user_id
    }, {
        unread_message: user.unread_message - noti.length
    });
    return {
      data: noti.map((e) => e),
    };
  }
};

const markAsRead = async (noti: Notification) => { 
  return (await notiRepo.update({ id: noti.id }, { is_read: true })).affected 
    ? success()
    : failed();
};

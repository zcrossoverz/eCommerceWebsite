// import { AppDataSource } from "../database"
// import { EnumTypeNotify, Notification } from "../entities/notification.entity"

import { EnumTypeNotify } from "../entities/notification.entity";
import { BadRequestError } from "../utils/error";

// const EnumNotiContent = (type: EnumTypeNotify) => {
//     return type;
// }

// const NotiRepo = AppDataSource.getRepository(Notification);
export const addNewNoti = (type: EnumTypeNotify) => {
    if(!type) return BadRequestError("type empty");
    if(!(type in EnumTypeNotify)) return BadRequestError("type not valid");
    return {type};
}
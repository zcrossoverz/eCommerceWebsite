import { AppDataSource } from "../database"
import { Order } from "../entities/order.entity"
import { EnumPaymentMethod, Payment } from "../entities/payment.entity";
import { BadRequestError } from "../utils/error";


export const selectMethod = async (order_id: number, method: EnumPaymentMethod) => {
    if(!method) return BadRequestError("method not select");
    const orderRepo = AppDataSource.getRepository(Order);
    const paymentRepo = AppDataSource.getRepository(Payment);
    const order = await orderRepo.findOne({ 
        where: { id: order_id },
        relations: {
            payment: true
        }
     });
    if(!order) return BadRequestError("order not found");
    const payment = await paymentRepo.findOneBy({ id: order.payment.id });
    if(!payment) return BadRequestError("payment data error");
    return await paymentRepo.update({ id: order.payment.id }, { method: Number(EnumPaymentMethod[method]) }) ? { msg: "success" } : { msg: "failed" };

}


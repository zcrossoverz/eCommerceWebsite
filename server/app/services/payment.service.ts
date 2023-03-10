import { AppDataSource } from "../database"
import { EnumStatusOrder, Order } from "../entities/order.entity"
import { EnumPaymentMethod, Payment } from "../entities/payment.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";

const orderRepo = AppDataSource.getRepository(Order);
const paymentRepo = AppDataSource.getRepository(Payment);

export const selectMethod = async (order_id: number, method: EnumPaymentMethod) => {
    if(!method) return BadRequestError("method not select");
    const order = await orderRepo.findOne({ 
        where: { id: order_id },
        relations: {
            payment: true
        }
     });
    if(!order) return BadRequestError("order not found");
    const payment = await paymentRepo.findOneBy({ id: order.payment.id });
    if(!payment) return BadRequestError("payment data error");
    return await paymentRepo.update({ id: order.payment.id }, { method: Number(EnumPaymentMethod[method]) }) ? success() : failed();

}

export const updateStatus = async (order_id: number) => {
    const order = await orderRepo.findOne({
        where: {
            id: order_id
        },
        relations:{
            payment: true
        }
    });
    if(!order) return BadRequestError("order not found");
    if(order.status !== EnumStatusOrder.PENDING) return BadRequestError("payment error");
    return await markAsPaid(order.payment);
    
}

export const markAsPaid = async (payment: Payment) => {
    return (!payment.is_paid && (await paymentRepo.update({ id: payment.id }, { is_paid: true })).affected) ? success() : failed;
}

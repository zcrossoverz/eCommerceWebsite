import { AppDataSource } from "../database";
import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/orderItem.entity";
import { Payment } from "../entities/payment.entity";
import { ProductOption } from "../entities/productOption.entity";
import { Timeline } from "../entities/timeline.entity";
import { User } from "../entities/user.entity";
import { BadRequestError } from "../utils/error";
import { decreaseStock } from "./inventory.service";

interface data_order {
    product_option_id: number,
    quantity: number
}

interface item_order {
    item: ProductOption;
    quantity: number;
    amount: number;
}

enum EnumTimelineStatus {
    ORDER_INIT = "Thank you for placing your order with us! We have received your order and are preparing to fulfill it.",
    ORDER_PROCESSING = "Your order is currently being processed. Our team is working diligently to ensure everything is just right.",
    ORDER_PACKAGED = "Great news! Your order has been packaged and is ready for shipping.",
    ORDER_SHIPPED = "Your order has been shipped and is on its way to you. We will send you tracking information as soon as it is available.",
    ORDER_DELIVERED = "Your order has been delivered! We hope you love your purchase and look forward to serving you again in the future."
}

export const createOrder = async (user_id: number, products: data_order[], address: string | null) => {
    const userRepo = AppDataSource.getRepository(User);
    const orderRepo = AppDataSource.getRepository(Order);
    const productOptRepo = AppDataSource.getRepository(ProductOption);
    const orderItemRepo = AppDataSource.getRepository(OrderItem);
    const paymentRepo = AppDataSource.getRepository(Payment);
    const timelineRepo = AppDataSource.getRepository(Timeline);
    if(!user_id || !products)  return BadRequestError("missing information");
    const user = await userRepo.findOne({
        where: {
            id: user_id
        },
        relations: {
            address: true
        }
    });
    if(!user) return BadRequestError("user not found");

    enum OrderError {
        quantity_exceed,
        item_not_found,
        quantity_not_valid
    }

    interface error_info {
        type: string;
        product_option_id: number;
    }

    const err = {
        error: false,
        info: [] as error_info[]
    };

    const setError = (type: OrderError, product_option_id: number) => {
        err.error = true;
        err.info.push({
            type: OrderError[type],
            product_option_id
        });
    }

    const items: item_order[] = [];
    await Promise.all(products.map(async e => {
        const rs = await productOptRepo.findOne({
            where: { id: e.product_option_id },
            relations: {
                price: true,
                warehouse: true
            }
        });
        if(!rs) {
            setError(OrderError.item_not_found, e.product_option_id);
            return;
        }
        if(rs.warehouse.quantity < e.quantity) {
            setError(OrderError.quantity_exceed, e.product_option_id);
            return;
        }
        if(e.quantity <= 0) {
            setError(OrderError.quantity_not_valid, e.product_option_id);
            return;
        }

        return items.push({
            item: rs,
            quantity: e.quantity,
            amount: Number(rs.price.price) * e.quantity
        });
    }));
    if(!address && !user.default_address) return BadRequestError("please fill address");
    if(err.error) return {
        errors: err.info
    }

    const new_order = await orderRepo.save(orderRepo.create({
        address: address ? address : user.address.find(e => e.id === user.default_address)?.address,
        user: user
    }));
    await paymentRepo.save(paymentRepo.create({
        amount: String(items.reduce((acc, current) => acc + current.amount, 0)),
        order: new_order
    }));
    items.map(async e => {
        await orderItemRepo.save(orderItemRepo.create({
            order: new_order,
            product_option: e.item,
            quantity: e.quantity
        }));
        await decreaseStock(e.item.id, e.quantity);
    });
    await timelineRepo.save(timelineRepo.create({
        order: new_order,
        content: EnumTimelineStatus.ORDER_INIT
    }));

    return new_order;

}
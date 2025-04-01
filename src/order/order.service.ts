import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivityEmitter } from 'src/events/events.emitter';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Events } from 'src/common/constants/events';
import { OrderProduct } from './order-product.enity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct) private readonly orderProductRepository: Repository<OrderProduct>,
        private readonly eventEmitter: UserActivityEmitter
    ) { }

    async createOrder(userId: number, data: CreateOrderDto) {
        try {
            const total = data.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
            const newOrder = this.orderRepository.create(
                {
                    userId,
                    total,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: 'pending'
                });

            let order = await this.orderRepository.save(newOrder);

            const orderProducts = data.products.map((product) => {
                return this.orderProductRepository.create({
                    productId: product.id,
                    price: product.price,
                    quantity: product.quantity,
                    orderId: order.id
                })
            })

            this.eventEmitter.emit(Events.ORDER_CREATE, { userId, data });
            
            await this.orderProductRepository.save(orderProducts);
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }
}

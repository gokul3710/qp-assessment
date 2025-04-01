import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column()
    price: number;

    @Column()
    quantity: number;
}
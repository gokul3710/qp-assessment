import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/login.dto';
import { Events } from 'src/common/constants/events';
import { UserActivityEmitter } from 'src/events/events.emitter';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
        private readonly eventEmitter: UserActivityEmitter
    ) { }

    onModuleInit() {
        this.eventEmitter.on(Events.ORDER_CREATE, (activity) => {
            this.onOrderCreation(activity);
        });
    }

    async findAll() {
        return this.productsRepository.find({
            where: {
                isDeleted: false
            },
            order: {
                createdAt: 'DESC'
            },
        });
    }

    async findOne(id: number) {
        return await this.productsRepository.findOne({ where: { id, isDeleted: false } }) || {};
    }

    async create(createProductDto: CreateProductDto) {
        const createdAt = new Date();
        const product = this.productsRepository.create(
            {
                ...createProductDto,
                stock: Number(createProductDto.stock),
                price: Number(createProductDto.price),
                createdAt,
                updatedAt: createdAt
            });

        this.eventEmitter.emit(Events.PRODUCT_CREATE, { product });
        return this.productsRepository.save(product);
    }

    async update(id: number, updateProductDto: CreateProductDto) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found');
        }
        this.eventEmitter.emit(Events.PRODUCT_UPDATE, { product, updateProductDto });
        return this.productsRepository.save({ ...product, ...updateProductDto });
    }

    async delete(id: number) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found');
        }
        this.eventEmitter.emit(Events.PRODUCT_DELETE, { product });
        return this.productsRepository.save({ ...product, isDeleted: true });
    }

    async getProductInStock() {
        return this.productsRepository.find({
            where: {
                isDeleted: false,
                stock: MoreThan(0)
            },
            order: {
                createdAt: 'DESC'
            },
        });
    }

    async getProductOutStock() {
        return this.productsRepository.find({
            where: {
                isDeleted: false,
                stock: 0
            },
            order: {
                createdAt: 'DESC'
            },
        });
    }

    async onOrderCreation(activity: { userId: number, data: CreateOrderDto }) {
        const { userId, data } = activity;
        const products = data.products;
        for (const product of products) {
            const productResource = await this.productsRepository.findOne({ where: { id: product.id } });
            if (!productResource) {
                throw new Error('Product not found');
            }
            if (productResource.stock < product.quantity) {
                throw new Error('Not enough stock');
            }
            this.productsRepository.save({ ...productResource, stock: productResource.stock - product.quantity });
        }
    }
}

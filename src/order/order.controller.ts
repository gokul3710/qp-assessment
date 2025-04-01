import { Body, Controller, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleGuard } from 'src/common/guards/role.guard';
import { UserGuard } from 'src/common/guards/user.guard';
import { OrderService } from './order.service';
import { userJwtPayload } from 'src/common/interface/jwt-user.payload';
import { User } from 'src/common/decorators/user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    @Post('')
    @UseGuards(UserGuard, RoleGuard)
    @UsePipes(ValidationPipe)
    async createOrder(@User() user: userJwtPayload, @Body() body: CreateOrderDto) {
        return await this.orderService.createOrder(Number(user.userId), body);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UserGuard } from 'src/common/guards/user.guard';
import { User } from 'src/common/decorators/user.decorator';
import { userJwtPayload } from 'src/common/interface/jwt-user.payload';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreateProductDto } from './dto/login.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @UseGuards(UserGuard, AdminGuard)
    async findAll(@User() user: userJwtPayload) {
        return this.productsService.findAll();
    }

    @Get('in-stock')
    @UseGuards(UserGuard, RoleGuard)
    async getProductInStock(@User() user: userJwtPayload) {
        return this.productsService.getProductInStock();
    }

    @Get('out-stock')
    @UseGuards(UserGuard, AdminGuard)
    async getProductOutStock(@User() user: userJwtPayload) {
        return this.productsService.getProductOutStock();
    }

    @Get(':id')
    @UseGuards(UserGuard, AdminGuard)
    async findOne(@User() user: userJwtPayload, @Param('id') id: number) {
        return this.productsService.findOne(id);
    }

    @Post()
    @UseGuards(UserGuard, AdminGuard)
    @UsePipes(ValidationPipe)
    async create(@User() user: userJwtPayload, @Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Put(':id')
    @UseGuards(UserGuard, AdminGuard)
    async update(@User() user: userJwtPayload, @Param('id') id: number, @Body() updateProductDto: CreateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(UserGuard, AdminGuard)
    async delete(@User() user: userJwtPayload, @Param('id') id: number) {
        return this.productsService.delete(id);
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,} from 'class-validator';

interface Product {
    id: number;
    price: number;
    quantity: number;
}

export class CreateOrderDto {

  @ApiProperty()
  @IsNotEmpty()
  products: Product[];

}

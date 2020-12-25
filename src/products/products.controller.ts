import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body() completeBody: { title: string; description: string; price: number },
  ) {
    const prodId = this.productService.insertProduct(
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    return { id: prodId };
  }

  @Get()
  getAllProducts() {
    return { products: this.productService.getProducts() };
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    this.productService.updateProduct(prodId, title, description, price);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId);
    return null;
  }
}

/*
  @Body('title') prodTitle: string,
  @Body('description') prodDesc: string,
  @Body('price') prodPrice: number
*/

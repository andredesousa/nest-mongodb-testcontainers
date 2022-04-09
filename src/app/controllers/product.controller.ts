import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() product: ProductDto): Promise<ProductDto> {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: ProductDto): Promise<ProductDto> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from '../dtos/product.dto';
import { Product, ProductDocument } from '../schemas/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productRepository: Model<ProductDocument>,
  ) {}

  /**
   * Gets a list of products.
   * @returns A list of products.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * Creates a product.
   * @param productDto The product to insert.
   * @returns The inserted product.
   */
  async create(productDto: ProductDto): Promise<Product> {
    return this.productRepository.create(productDto);
  }

  /**
   * Gets a product by id.
   * @param id The id of the product.
   * @returns The product.
   */
  async findOne(id: string): Promise<Product> {
    return this.productRepository.findById(id);
  }

  /**
   * Updates a product.
   * @param id The id of the product.
   * @param productDto The product to update.
   * @returns The updated product.
   */
  async update(id: string, productDto: ProductDto): Promise<Product> {
    return this.productRepository.findByIdAndUpdate(id, productDto, { new: true });
  }

  /**
   * Deletes a product by id.
   * @param id The id of the product to delete.
   * @returns The status of the operation.
   */
  async delete(id: string): Promise<void> {
    return this.productRepository.findByIdAndDelete(id);
  }
}

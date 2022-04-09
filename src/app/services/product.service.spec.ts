import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product';
import { ProductService } from './product.service';
import { ProductDto } from '../dtos/product.dto';

describe('ProductService', () => {
  let product: ProductDto;
  let repository: Model<ProductDocument>;
  let service: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            find: jest.fn(() => []),
            create: jest.fn(() => product),
            findById: jest.fn(() => product),
            findByIdAndUpdate: jest.fn(() => product),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Model<ProductDocument>>(getModelToken(Product.name));
    product = new ProductDto();
  });

  describe('#findAll', () => {
    it('returns an array of products', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('#create', () => {
    it('returns a new product', async () => {
      expect(await service.create(product)).toEqual(product);
    });
  });

  describe('#findOne', () => {
    it('returns an product', async () => {
      expect(await service.findOne('id')).toEqual(product);
    });
  });

  describe('#update', () => {
    it('returns the updated product', async () => {
      expect(await service.update('id', product)).toEqual(product);
    });
  });

  describe('#delete', () => {
    it('removes the product', async () => {
      jest.spyOn(repository, 'findByIdAndDelete');

      await service.delete('id');

      expect(repository.findByIdAndDelete).toHaveBeenCalledWith('id');
    });
  });
});

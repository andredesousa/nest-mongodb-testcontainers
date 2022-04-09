import { Mock } from 'ts-mockery';
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;
  let product: ProductDto;

  beforeEach(() => {
    product = new ProductDto();
    service = Mock.of<ProductService>({
      create: () => Promise.resolve(product),
      findAll: () => Promise.resolve([]),
      findOne: () => Promise.resolve(product),
      delete: () => Promise.resolve(),
      update: () => Promise.resolve(product),
    });

    controller = new ProductController(service);
  });

  describe('#findAll', () => {
    it('returns an array of products', async () => {
      const result: ProductDto[] = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('#findOne', () => {
    it('returns an product', async () => {
      const result: ProductDto = await controller.findOne('id');

      expect(result).toEqual(product);
      expect(service.findOne).toHaveBeenCalledWith('id');
    });
  });

  describe('#create', () => {
    it('returns a new product', async () => {
      const result: ProductDto = await controller.create(product);

      expect(result).toEqual(product);
      expect(service.create).toHaveBeenCalledWith(product);
    });
  });

  describe('#update', () => {
    it('returns the updated product', async () => {
      const result: ProductDto = await controller.update('id', product);

      expect(result).toEqual(product);
      expect(service.update).toHaveBeenCalledWith('id', product);
    });
  });

  describe('#remove', () => {
    it('removes the product', async () => {
      await controller.delete('id');

      expect(service.delete).toHaveBeenCalledWith('id');
    });
  });
});

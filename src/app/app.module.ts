import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { ProductController } from './controllers/product.controller';
import { Product, ProductSchema } from './schemas/product';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: environment.dbURI,
        dbName: environment.dbName,
        user: environment.dbUsername,
        pass: environment.dbPassword,
      }),
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}

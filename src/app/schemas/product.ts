import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({ type: SchemaTypes.Number })
  quantity: number;

  @Prop()
  unit: string;

  @Prop({ type: SchemaTypes.Number })
  price: number;

  @Prop()
  currency: string;

  @Prop({ defaultValue: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

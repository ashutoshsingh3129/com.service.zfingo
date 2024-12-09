import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Product>;


  
  

@Schema({ collection: 'products', timestamps: true })
export class Product {
  

  @Prop({ required:  true, ref:'partner'})
  partnerId: mongoose.Types.ObjectId;
  
  @Prop({ required:  true})
  price: number; 
  
  @Prop({ required:  true})
  category: [string]; 



}

export const ProductSchema = SchemaFactory.createForClass(Product);



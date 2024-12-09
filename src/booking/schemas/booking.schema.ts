import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Booking>;

@Schema({ collection: 'booking', timestamps: true })
export class Booking {
  @Prop({ required: true ,ref:'user'})
  userId: mongoose.Types.ObjectId; 

  @Prop({ required:  true, ref:'partner'})
  partnerId: mongoose.Types.ObjectId;
  
  @Prop({ required:  true})
  price: number; 
  
  @Prop({ required:  true,ref:'items'})
  itemId: string; 



}

export const BookingSchema = SchemaFactory.createForClass(Booking);



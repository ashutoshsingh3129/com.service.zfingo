import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;


@Schema({ collection: 'reviews', timestamps: true })
export class Review {
  

  @Prop({ required:  false, ref:'partner'})
  partnerId: mongoose.Types.ObjectId;
  
  @Prop({ required:  false,ref:'users'})
  userId: mongoose.Types.ObjectId; 
  
  @Prop({ required:  false})
  rating: number; 

  @Prop({ required:  false})
  comment: string; 


}

export const ReviewSchema = SchemaFactory.createForClass(Review);



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Partner>;

@Schema({ collection: 'partners', timestamps: true })
export class Partner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false  })
  GSTNumber: string;

  @Prop({ required: false  })
  email: string;

  
  @Prop({ required: false ,enum: ['Point'] })
  location:string 
    
  @Prop({required:false})
  coordinates:[Number]

  @Prop({required:false, })
  ownerName:Boolean

  @Prop({required:false })
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  }
  @Prop({required:false, })
  categories: [string]
  
 @Prop({require:false,ref:'users'})
  userId:string

}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
PartnerSchema.index({mobile: 1}, {unique: true});
PartnerSchema.index({ location: '2dsphere' }); // For geospatial queries
PartnerSchema.index({ userId: 1 }); // To query partners by user
PartnerSchema.index({ name: 1 }); // To query partners by name
PartnerSchema.index({ categories: 1 }); // For filtering by categories
PartnerSchema.index({ 'address.city': 1, 'address.state': 1 }); // Optional, for address-based filtering


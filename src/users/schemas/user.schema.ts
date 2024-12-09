import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true  })
  role: string;

  @Prop({
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { emailId: { $type: 'string' } },
    },
  })
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  password: string;


  @Prop({ required: false ,enum: ['Point'] })
  location:string 
    
  @Prop({required:false})
  coordinates:[Number]

 
  @Prop({required:false, default:false})
  isDeleted:Boolean

  @Prop()
  FCMToken:string
 

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({mobile: 1}, {unique: true});

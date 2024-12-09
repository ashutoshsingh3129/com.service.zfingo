import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { query } from 'express';
import { DatabaseErrorService } from 'src/shared/error-handling/database-error.service';
import { Review } from './schemas/review.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private review: Model<Review>,
        private dbErrorService:DatabaseErrorService
    ){
        
    }

    async get(query:any){
        try{
       return await this.review.find(query)
        }
        catch(error){
            this.dbErrorService.handle(error);
        }
    }
    async create(payload:any){
        try {
            const partner = new this.review(payload);
            const response = await partner.save();
            return response;
          } catch (error: any) {
            this.dbErrorService.handle(error);
          }
    }
    
  
    async updateById(id: string, payload: any) {
      try {
        const res = await this.review.findByIdAndUpdate(
          id ,
          { $set: payload },
        );
        return res;
      } catch (error: any) {
        this.dbErrorService.handle(error);
      }
    }
  
    async delete(id: any) {
      try {
        const leadsPool = await this.review.deleteOne({ _id: id });
        return leadsPool;
      } catch (error: any) {
        this.dbErrorService.handle(error);
      }
    }
  
}

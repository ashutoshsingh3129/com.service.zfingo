import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { query } from 'express';
import { DatabaseErrorService } from 'src/shared/error-handling/database-error.service';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductDbService {
    constructor(
        @InjectModel(Product.name) private product: Model<Product>,
        private dbErrorService:DatabaseErrorService
    ){
        
    }

    async get(query:any){
        try{
       return await this.product.find(query)
        }
        catch(error){
            this.dbErrorService.handle(error);
        }
    }
    async create(payload:any){
        try {
            const partner = new this.product(payload);
            const response = await partner.save();
            return response;
          } catch (error: any) {
            this.dbErrorService.handle(error);
          }
    }
    
  
    async updateById(id: string, payload: any) {
      try {
        const res = await this.product.findByIdAndUpdate(
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
        const leadsPool = await this.product.deleteOne({ _id: id });
        return leadsPool;
      } catch (error: any) {
        this.dbErrorService.handle(error);
      }
    }
  
}

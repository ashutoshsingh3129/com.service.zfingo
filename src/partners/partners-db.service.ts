import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from './schemas/partner.schemas';
import { Model } from 'mongoose';
import { query } from 'express';
import { DatabaseErrorService } from 'src/shared/error-handling/database-error.service';

@Injectable()
export class PartnersDbService {
    constructor(
        @InjectModel(Partner.name) private partner: Model<Partner>,
        private dbErrorService:DatabaseErrorService
    ){
        
    }

    async get(query:any){
        try{
       return await this.partner.find(query)
        }
        catch(error){
            this.dbErrorService.handle(error);
        }
    }
    async createPartner(payload:any){
        try {
            const partner = new this.partner(payload);
            const response = await partner.save();
            return response;
          } catch (error: any) {
            this.dbErrorService.handle(error);
          }
    }
    
    async getPartnersByLocation(coordinates:number[]){
        try{
       return await this.partner.find({ location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates:coordinates
          },
          $maxDistance: 5000
        }
      }})
        }
        catch(error){
            this.dbErrorService.handle(error);
        }
    }
    async updateById(id: string, payload: any) {
      try {
        const leadsPool = await this.partner.findByIdAndUpdate(
          id ,
          { $set: payload },
        );
        return leadsPool;
      } catch (error: any) {
        this.dbErrorService.handle(error);
      }
    }
  
    async delete(id: any) {
      try {
        const leadsPool = await this.partner.deleteOne({ _id: id });
        return leadsPool;
      } catch (error: any) {
        this.dbErrorService.handle(error);
      }
    }
  
}

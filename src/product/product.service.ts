import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ProductDbService } from './product-db.service';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor(private partnersDbService:ProductDbService){

    }
    async get(query:any){
        return await this.partnersDbService.get(query)
    }

    async create(payload){
        let res= await this.partnersDbService.create(payload)
        return res
    }
    async update(id: string, updateUser:any) {
        let res=await this.partnersDbService.updateById(id,updateUser)
    }
  
    async remove(id: string) {
      try {
        let response = await this.partnersDbService.delete(id);
      } catch (error) {
        this.logger.error('Error in removing from personal lead pool:', error);
        switch (error.name) {
          case 'InternalServerError':
            throw new BadRequestException(error.message || JSON.stringify(error));
          default:
            throw error;
        }
      }
    }
}
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PartnersDbService } from './partners-db.service';

@Injectable()
export class PartnersService {
    private readonly logger = new Logger(PartnersService.name);
    constructor(private partnersDbService:PartnersDbService){

    }
    async get(query:any){
        return await this.partnersDbService.get(query)
    }

    async createPartner(payload){
        let res= await this.partnersDbService.createPartner(payload)
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
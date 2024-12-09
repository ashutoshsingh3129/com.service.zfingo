import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { query } from 'express';

@Controller('partners')
export class PartnersController {
    private readonly logger = new Logger(PartnersController.name);
    constructor(private partnerService:PartnersService){}

    @Get()
    async getPartners(){
        let query={}
        let res=await this.partnerService.get(query)
        return res
    }

    @Post()
    async createPartner(@Body() payload:any){
        let res= await this.partnerService.createPartner(payload)
        return res
    }
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() partnerDto: any,
    ) {
      return this.partnerService.update(id, partnerDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      this.logger.log('Request receive delete partner', id);
      const response = await this.partnerService.remove(id);
      return response;
    }
}

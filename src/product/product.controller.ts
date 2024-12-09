import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { query } from 'express';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    private readonly logger = new Logger(ProductController.name);
    constructor(private productService:ProductService){}

    @Get()
    async getPartners(){
        let query={}
        let res=await this.productService.get(query)
        return res
    }

    @Post()
    async createPartner(@Body() payload:any){
        let res= await this.productService.create(payload)
        return res
    }
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() partnerDto: any,
    ) {
      return this.productService.update(id, partnerDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      this.logger.log('Request receive delete partner', id);
      const response = await this.productService.remove(id);
      return response;
    }
}

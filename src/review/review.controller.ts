import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { query } from 'express';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    private readonly logger = new Logger(ReviewController.name);
    constructor(private reviewService:ReviewService){}

    @Get()
    async getPartners(){
        let query={}
        let res=await this.reviewService.get(query)
        return res
    }

    @Post()
    async createPartner(@Body() payload:any){
        let res= await this.reviewService.create(payload)
        return res
    }
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() partnerDto: any,
    ) {
      return this.reviewService.updateById(id, partnerDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      this.logger.log('Request receive delete partner', id);
      const response = await this.reviewService.delete(id);
      return response;
    }
}

import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schemas/partner.schemas';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
    ],
  
  controllers: [PartnersController],
  providers: [PartnersService]
})
export class PartnersModule {}

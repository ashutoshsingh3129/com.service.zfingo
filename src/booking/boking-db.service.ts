
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isEmpty } from 'lodash';
import { DatabaseErrorService } from 'src/shared/error-handling/database-error.service';
import { Booking } from './schemas/booking.schema';

@Injectable()
export class BookingDbService {
  constructor(
    @InjectModel(Booking.name)
    private booking: Model<Booking>,
    private dbErrorService: DatabaseErrorService,
  ) { }

  async create(payload: any) {
    try {
      const booking = new this.booking(payload);
      const response = await booking.save();
      return response;
    } catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }

  async getAll(
    skip: number,
    limit: number,
    sortKey: string,
    sortDir: string,
    query: any,
  ) {
    const sortObj: any = {
      [sortKey]: sortDir === 'DESC' ? -1 : 1,
    };
    const totalItems: number = await this.booking
      .countDocuments(query)
      .exec();
    const totalPages: number = Math.floor((totalItems - 1) / limit) + 1;
    console.log("booking query",query)
    const leadsPools = await this.booking
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortObj)
      .exec();
    return {
      data: leadsPools,
      totalItems,
      totalPages,
    };
  }

  async getOne(query: any) {
    const booking = await this.booking.findOne(query).exec();
    return booking;
  }
  async findById(query: any) {
    const leadsPool = await this.booking.findById(query).exec();
    return leadsPool;
  }
  async updateById(id: string, payload: any) {
    try {
      const leadsPool = await this.booking.findByIdAndUpdate(
        id ,
        { $set: payload },
      );
      return leadsPool;
    } catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }

  async removeService(id: any) {
    try {
      const leadsPool = await this.booking.deleteOne({ _id: id });
      return leadsPool;
    } catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }
  async getCountedDatabyID(query: any) {
    try {
      let leadPooldata = await this.booking.countDocuments(query).exec()
      return leadPooldata
    } catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }

  
  async deleteMany(query:any){
    try{
      let deletedItems = await this.booking.deleteMany(query)
      return deletedItems
    }
    catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }
}

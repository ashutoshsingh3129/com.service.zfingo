
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isEmpty } from 'lodash';
import { DatabaseErrorService } from 'src/shared/error-handling/database-error.service';
import { User } from './schemas/user.schema';

@Injectable()
export class UserDbService {
  constructor(
    @InjectModel(User.name)
    private user: Model<User>,
    private dbErrorService: DatabaseErrorService,
  ) { }

  async create(payload: any) {
    try {
      const user = new this.user(payload);
      const response = await user.save();
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
    const totalItems: number = await this.user
      .countDocuments(query)
      .exec();
    const totalPages: number = Math.floor((totalItems - 1) / limit) + 1;
    console.log("user query",query)
    const leadsPools = await this.user
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
    const user = await this.user.findOne(query).exec();
    return user;
  }
  async findById(query: any) {
    const leadsPool = await this.user.findById(query).exec();
    return leadsPool;
  }
  async updateById(id: string, payload: any) {
    try {
      const leadsPool = await this.user.findByIdAndUpdate(
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
      const leadsPool = await this.user.deleteOne({ _id: id });
      return leadsPool;
    } catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }
  async getCountedDatabyID(query: any) {
    try {
      let leadPooldata = await this.user.countDocuments(query).exec()
      return leadPooldata
    } catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }

  
  async deleteMany(query:any){
    try{
      let deletedItems = await this.user.deleteMany(query)
      return deletedItems
    }
    catch (error: any) {
      this.dbErrorService.handle(error);
    }
  }
}

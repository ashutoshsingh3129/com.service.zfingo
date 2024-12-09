import {
    BadRequestException,
    Injectable,
    Logger,
  } from '@nestjs/common';

  import { query } from 'express';
import { UserDbService } from './user-db.service';
  
  @Injectable()
  export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(private userdbService: UserDbService) { }
  
    async create(dto: any) {
        let response =this.userdbService.create(dto)
        return response
    }
  async login(data:any){
    let user=await this.userdbService.getOne({email:data.email})
    if(!user) throw new BadRequestException("User Not found by mail")
    return user

  }
    async findAll(
      skip: number,
      limit: number,
      sortKey: string,
      sortDir: string,
      query: any,
    ) {
      try {
        let response = await this.userdbService.getAll(
          skip,
          limit,
          sortKey,
          sortDir,
          query,
        );
  
        return response;
      } catch (error) {
        this.logger.error('Error in finding all from personal lead pool:', error);
        switch (error.name) {
          case 'InternalServerError':
            throw new BadRequestException(error.message || JSON.stringify(error));
          default:
            throw error;
        }
      }
    }
  
   async findOne(id: number) {
    let res= await this.userdbService.getOne({})
      return res;
    }
  
    async update(id: string, updateUser:any) {
        let res=await this.userdbService.updateById(id,updateUser)
        return res
    }
  
    async remove(id: string) {
      try {
        let response = await this.userdbService.removeService(id);
        return response
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
    async getDatabyId(query: any) {
      const totalPersonalLeads: any = await this.userdbService.getCountedDatabyID(query)
      return totalPersonalLeads
  
    }
 
    async removePoolByUserId(userId:string){
      const removedItems: any = await this.userdbService.deleteMany({userId:userId})
      return removedItems
    }
  }
  
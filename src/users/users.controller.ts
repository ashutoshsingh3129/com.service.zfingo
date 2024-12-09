import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query, UseGuards } from '@nestjs/common';
import { RequestContextService } from 'src/shared/request-context/request-context.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './users.service';

//@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService,
    private contextService: RequestContextService) { }


  @Post('/create')  
  async create(@Body()payload:any) {
    this.logger.log('losd',payload)
    const response = await this.userService.create(payload);
    return response;
  }

  @Get()
  async findAll(@Query() params: any) {
    this.logger.log('Request received to find all leads pool');
    const role: string = this.contextService.get('role');
    const userId: string = this.contextService.get('userId');
    let query = {};

    const pageNumber: number = Number(params?.pageNumber) || 0;
    const limit: number = Number(params?.size) || 8;
    const skip: number = pageNumber * limit;
    const sortKey: string = params?.sortKey || 'createdAt';
    const sortDir: string = params?.sortDir || 'DESC';
      query['userId']=userId
    if (params?.startTime) {
      const startTime = params.startTime;
      let endTime = new Date().toISOString();
      if (params?.endTime) {
        endTime = params.endTime;
      }
      const value: any = { $gte: new Date(startTime), $lt: new Date(endTime) };
      query['updatedAt'] = value;
    }
    const response = await this.userService.findAll(
      skip,
      limit,
      sortKey,
      sortDir,
      query,
    );
    return response;
  }

  @Get('/v1/personal-pool/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonalLeadsPoolDto: any,
  ) {
    return this.userService.update(id, updatePersonalLeadsPoolDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('Request received to delete lead from lead pool', id);
    const response = await this.userService.remove(id);
    return response;
  }
 
}

import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserDbService } from './user-db.service';
import { ErrorHandlingModule } from 'src/shared/error-handling/error-handling.module';
import { RequestContextModule } from 'src/shared/request-context/request-context.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },

    ]),
    JwtModule,
    RequestContextModule,
  ErrorHandlingModule],
  controllers: [UserController],
  providers: [UserService, UserDbService],
  exports:[UserService]
})
export class UsersModule {}

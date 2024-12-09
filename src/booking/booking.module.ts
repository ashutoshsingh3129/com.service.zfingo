import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingDbService } from './boking-db.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { DatabaseErrorService } from 'src/shared/error-handling/database-error.service';
import { ErrorHandlingModule } from 'src/shared/error-handling/error-handling.module';
import { JwtModule } from '@nestjs/jwt';
import { RequestContextModule } from 'src/shared/request-context/request-context.module';

@Module({
    imports:[ MongooseModule.forFeature([
        { name: Booking.name, schema: BookingSchema },
        
    ]),
    JwtModule,
    ErrorHandlingModule,
RequestContextModule
],
    controllers:[BookingController],
    providers:[BookingService,BookingDbService],
    exports:[BookingService]

})
export class BookingModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnersModule } from './partners/partners.module';
import { BookingService } from './booking/booking.service';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import { LocationModule } from './location/location.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { UsersModule } from './users/users.module';
import configuration from './common/config/configuration';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri')
      }),
      inject: [ConfigService],
    }),
    PartnersModule,
    BookingModule,
    LocationModule,
    ProductModule,
    WebsocketsModule,
    UsersModule,
    AuthModule,
    FirebaseModule,
    NotificationModule,
    ReviewModule


  ],
  controllers: [AppController],
  providers: [AppService, NotificationService],
})
export class AppModule {}

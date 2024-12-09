import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports:[],
  controllers: [NotificationController],
 // providers:[FirebaseService]

})
export class NotificationModule {}

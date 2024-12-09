import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('notifications')
export class NotificationController {
 // constructor(private readonly firebaseService: FirebaseService) {}

  @Post('send')
  async sendNotification(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('body') body: string,
    @Body('data') data?: Record<string, string>,
  ) {
   // return this.firebaseService.sendNotification(token, title, body, data);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {

    constructor(private firebaseService:FirebaseService){}

    @Post('notification/send')
    async sendNotification(@Body() payload:any){

        this.firebaseService.sendNotification(payload.token,payload.title,payload.data)
    }
}

import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App) {}

  async sendNotification(token: string, title: string, body: string, data?: Record<string, string>) {
    const message = {
      notification: {
        title,
        body,
      },
      data: data || {},
      token,
    };

    try {
      const response = await this.firebaseApp.messaging().send(message);
      console.log('Successfully sent notification:', response);
      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
}

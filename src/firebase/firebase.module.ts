import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';
import * as path from 'path';

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const filePath = path.resolve(__dirname, '../../src/config/google-services.json');//../config/google-services.json
        console.log('Resolved Path:', filePath); // This will print the resolved path  

        const app = admin.initializeApp({
          credential: admin.credential.cert(require(filePath)),
        });
        console.log('Firebase initialized successfully'); // Optional success log
        return app;
      },
    },
    FirebaseService,
  ],
  exports: [FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}

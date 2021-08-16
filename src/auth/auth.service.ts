import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import firebase from 'firebase/app'
import 'firebase/auth'

import { Login } from '../users/user.entity'

@Injectable()
export class AuthService {

    private firebaseApp: firebase.app.App

    constructor() {
        this.firebaseApp = firebase.initializeApp({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID
        })
    }

    public async signIn(login: Login): Promise<string | null> {
        try {
            const credential = await this.firebaseApp.auth().signInWithEmailAndPassword(login.email, login.password)
            return await credential.user.getIdToken()
        } catch (error) {
            throw new HttpException('Invalid login!', HttpStatus.UNAUTHORIZED)
        }
    }

}
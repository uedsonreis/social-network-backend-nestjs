import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

import { User } from './user.entity'

@Injectable()
export class UserService {

    private firebaseAdmin: admin.app.App

    constructor() {
        this.firebaseAdmin = admin.initializeApp({
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
        })
    }

    public async getByEmail(email: string) {
        const record = await this.firebaseAdmin.auth().getUserByEmail(email)
        return this.getUser(record)
    }

    public async create(user: User) {
        const record = await this.firebaseAdmin.auth().createUser({
            email: user.email,
            displayName: user.name,
            password: user.password
        })
        return this.getUser(record)
    }

    private getUser(record: admin.auth.UserRecord): User | null {
        if (!record || record.disabled) return null

        return {
            id: record.uid,
            email: record.email,
            name: record.displayName
        } as User
    }

}
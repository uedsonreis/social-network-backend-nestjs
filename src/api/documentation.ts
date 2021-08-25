import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export function setupDocumentation(app: INestApplication): void {

    let baseURL = `http://locahost:${process.env.SERVICE_PORT}/`

    if (process.env.NODE_ENV === 'production') {
        baseURL = 'https://social-network-for-class.herokuapp.com/';
    }

    const options = new DocumentBuilder()
        .setTitle('Social Network API')
        .setDescription(`Base URL: ${baseURL}`)
        .setVersion('1.0.0')
    .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('', app, document)
}
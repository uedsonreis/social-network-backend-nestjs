import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from 'src/app.module'
import { setupDocumentation } from 'src/api/documentation'

async function bootstrap() {

    const app = await NestFactory.create(AppModule)

    setupDocumentation(app)

    await app.listen(process.env.SERVICE_PORT)
}

bootstrap()
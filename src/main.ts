import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { setupDocumentation } from './api/documentation'

async function bootstrap() {
    
    const app = await NestFactory.create(AppModule)
    app.enableCors();

    setupDocumentation(app)    
    
    await app.listen(process.env.PORT)
}

bootstrap()
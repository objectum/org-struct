import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './module'

async function bootstrap() {
    const server = await NestFactory.create(AppModule)

    const swaggerConfig = new DocumentBuilder()
        .setTitle('org-struct Express API with Swagger')
        .setVersion('0.0.1')
        .build()

    const document = SwaggerModule.createDocument(server, swaggerConfig)
    SwaggerModule.setup('api', server, document)

    await server.listen(3000)
}

bootstrap()

import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from '../config/typeorm'
import { AppController } from '../controller'
import { EmpModule } from '.'
import Next from 'next'
import { RenderModule } from 'nest-next'

@Module({
    imports: [
        RenderModule.forRootAsync(
            Next({
                dev: process.env.NODE_ENV !== 'production',
                conf: { useFilesystemPublicRoutes: false },
            }),
        ),
        TypeOrmModule.forRoot(typeOrmConfig),
        forwardRef(() => EmpModule),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}

import { config as dotenvConfig } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

dotenvConfig({ path: '.env' })

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOSTNAME,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['../**/*.entity{.ts,.js}'],
    migrations: ['.next/production-server/migration/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
}

export const connectionSource = new DataSource(typeOrmConfig as DataSourceOptions)

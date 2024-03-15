import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmpController } from '../controller'
import { EmpService } from '../service'
import { Emp } from '../entity'

@Module({
    controllers: [EmpController],
    providers: [EmpService],
    imports: [TypeOrmModule.forFeature([Emp])],
    exports: [EmpService],
})
export class EmpModule {}

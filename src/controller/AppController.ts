import { Controller, Get, Render } from '@nestjs/common'
import { EmpService } from '../service'
import { Emp } from '../entity'

@Controller()
export class AppController {
    constructor(private readonly empService: EmpService) {}

    @Render('home')
    @Get()
    async index() {
        const emps: Emp[] = await this.empService.getAll()

        return { emps }
    }
}

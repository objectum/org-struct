import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EmpService } from '../service'
import { Emp } from '../entity'
import { CreateEmpDTO, UpdateEmpDTO } from '../dto'

@ApiTags('emp-controller')
@Controller('emp')
export class EmpController {
    constructor(private readonly empService: EmpService) {}

    @Post()
    @ApiOperation({ summary: 'create a employee' })
    @ApiResponse({ status: 200, type: Emp })
    async create(@Body() createEmpDTO: CreateEmpDTO): Promise<Emp> {
        return this.empService.create(createEmpDTO)
    }

    @Put(':id')
    @ApiOperation({ summary: 'update the employee' })
    @ApiResponse({ status: 200, type: Emp })
    async update(@Param('id') empId: number, @Body() updateEmpDTO: UpdateEmpDTO): Promise<Emp> {
        return this.empService.update(empId, updateEmpDTO)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete the employee' })
    @ApiResponse({ status: 200, type: Emp })
    async remove(@Param('id') empId: number): Promise<Emp> {
        return this.empService.remove(empId)
    }

    @Get('list')
    @ApiOperation({ summary: 'get the list of employees' })
    @ApiResponse({ status: 200, type: Emp, isArray: true })
    async getAll(): Promise<Emp[]> {
        return this.empService.getAll()
    }
}

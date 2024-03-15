import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Emp } from '../entity'
import { CreateEmpDTO, UpdateEmpDTO } from '../dto'

@Injectable()
export class EmpService {
    constructor(
        @InjectRepository(Emp)
        private empRepository: Repository<Emp>,
    ) {}

    async findOrThrowException(empId: number): Promise<Emp> {
        const emp: Emp = await this.empRepository.findOne({ where: { id: empId } })

        if (!emp) {
            throw new NotFoundException(`emp not found: ${empId}`)
        }
        return emp
    }

    async getAll(): Promise<Emp[]> {
        return this.empRepository.find()
    }

    async create(createEmpDTO: CreateEmpDTO): Promise<Emp> {
        return this.empRepository.save(new Emp(createEmpDTO.name, createEmpDTO.parentId))
    }

    async update(empId: number, updateEmpDTO: UpdateEmpDTO): Promise<Emp> {
        const emp: Emp = await this.findOrThrowException(empId)

        Object.assign(emp, updateEmpDTO)

        return this.empRepository.save(emp)
    }

    async remove(empId: number): Promise<Emp> {
        const emp: Emp = await this.findOrThrowException(empId)

        await this.empRepository.createQueryBuilder().delete().where(`id = ${empId}`).execute()

        return emp
    }
}

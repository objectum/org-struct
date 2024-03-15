import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

@Entity()
export class Emp {
    constructor(name: string, parentId?: number) {
        this.name = name
        this.parentId = parentId
    }

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string

    @ApiPropertyOptional()
    @Column()
    parentId?: number
}

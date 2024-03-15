import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class CreateEmpDTO {
    @ApiProperty()
    name: string

    @ApiPropertyOptional()
    parentId?: number
}

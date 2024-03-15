import { ApiPropertyOptional } from '@nestjs/swagger'

export default class UpdateEmpDTO {
    @ApiPropertyOptional()
    name?: string

    @ApiPropertyOptional()
    parentId?: number
}

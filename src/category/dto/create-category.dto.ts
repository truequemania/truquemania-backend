import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  descripcion: string;
}

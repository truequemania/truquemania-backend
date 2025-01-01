import { ApiProperty } from '@nestjs/swagger';

export class CreateArticuloDto {
  @ApiProperty({ description: 'Nombre único del artículo' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del artículo' })
  descripcion: string;

  @ApiProperty({ description: 'ID de la categoría del artículo' })
  categoria_id: number;

  @ApiProperty({ description: 'ID del usuario propietario del artículo' })
  user_id: number;

  @ApiProperty({ description: 'Estado del artículo (nuevo, usado, etc.)' })
  estado: string;

  @ApiProperty({
    description: 'Imagen del artículo',
    type: 'string',
    format: 'binary',
  })
  imagen: Express.Multer.File;
}
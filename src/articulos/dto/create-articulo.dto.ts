import { ApiProperty } from '@nestjs/swagger';

export class CreateArticuloDto {
  @ApiProperty({ description: 'Nombre único del artículo' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del artículo' })
  descripcion: string;

  @ApiProperty({ description: 'Categoría del artículo' })
  categoria: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario propietario del artículo',
  })
  email: string; 

  @ApiProperty({ description: 'Estado del artículo (nuevo, usado, etc.)' })
  estado: string;

  @ApiProperty({
    description: 'Imagen del artículo',
    type: 'string',
    format: 'binary',
  })
  imagen: Express.Multer.File;
}

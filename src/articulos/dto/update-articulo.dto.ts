import { ApiProperty } from "@nestjs/swagger";

export class UpdateArticuloDto {
    @ApiProperty({ description: 'Nombre único del artículo a actualizar' })
    nombre: string;

    @ApiProperty({ description: 'Nueva descripción del artículo', required: false })
    descripcion?: string;

    @ApiProperty({ description: 'Nueva categoría del artículo', required: false })
    categoria?: string;

    @ApiProperty({ description: 'Correo electrónico del usuario propietario del artículo', required: true })
    email: string; 

    @ApiProperty({ description: 'Nuevo estado del artículo (nuevo, usado, etc.)', required: false })
    estado?: string;
}

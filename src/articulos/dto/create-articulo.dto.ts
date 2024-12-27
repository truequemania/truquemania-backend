import { ApiProperty } from '@nestjs/swagger';

export class CreateArticuloDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    categoria: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    estado: string;
    @ApiProperty()
    imagen: Express.Multer.File;
    @ApiProperty()
    favorito: boolean;
}
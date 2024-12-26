import { ApiProperty } from "@nestjs/swagger";

export class UpdateArticuloDto {
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
}
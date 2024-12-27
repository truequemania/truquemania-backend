import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Articulo } from './entities/articulo.entity';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

@ApiTags('articulos')
@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async createCampaña(
    @UploadedFile() imagen: Express.Multer.File,
    @Body() newCampaña: CreateArticuloDto) {
    return await this.articulosService.createArticulo({ ...newCampaña, imagen });
  }

  @Get()
  async findAll(): Promise<Articulo[]> {
    return this.articulosService.findAll();
  }

  @Patch(':id')
  async updateCampana(
    @Param('id') id: string,
    @Body() updateCampaña: CreateArticuloDto,
  ) {
    return this.articulosService.updateArticulo(id, updateCampaña);
  }

  @Patch(':id/imagen')
  @UseInterceptors(FileInterceptor('imagen'))
  async updateImagen(
    @Param('id') id: string,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    return this.articulosService.updateImagen(id, imagen);
  }

  @Patch(':id')
  async updateFavorito(@Param('id') id: number, @Body() updateData: { favorito: boolean; email: string }) {
    const { favorito, email } = updateData;
    return this.articulosService.updateFavorito(id, favorito, email);
  }

  @Delete(':id')
  async deleteCampana(@Param('id') id: string) {
    return this.articulosService.deleteArticulo(id);
  }

}

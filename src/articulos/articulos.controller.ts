import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Articulo } from './entities/articulo.entity';
import { CreateArticuloDto } from './dto/create-articulo.dto';

@ApiTags('articulos')
@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}

  @Get()
  async findAll(): Promise<Articulo[]> {
    return this.articulosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.articulosService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    @UploadedFile() imagen: Express.Multer.File,
    @Body() newArticle: CreateArticuloDto,
  ) {
    return await this.articulosService.createArticulo({
      ...newArticle,
      imagen,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCampaña: CreateArticuloDto,
  ) {
    return this.articulosService.updateArticulo(id, updateCampaña);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.articulosService.deleteArticulo(id);
  }

  @Patch(':id/imagen')
  @UseInterceptors(FileInterceptor('imagen'))
  async updateImagen(
    @Param('id') id: string,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    return this.articulosService.updateImagen(id, imagen);
  }
}

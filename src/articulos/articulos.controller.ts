import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { ApiTags } from '@nestjs/swagger';
import { Articulo } from './entities/articulo.entity';

@ApiTags('articulos')
@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) { }
  @Post()
  async createCampaña(@Body() newCampaña: CreateArticuloDto) {
    return await this.articulosService.createArticulo(newCampaña);
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

  @Delete(':id')
  async deleteCampana(@Param('id') id: string) {
    return this.articulosService.deleteArticulo(id);
  }

}

import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { ApiTags } from '@nestjs/swagger';
import { Favorito } from './entities/favorito.entity';

@ApiTags('favorito')
@Controller('favorito')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) {}

  @Post()
  async create(@Body() createFavoritoDto: CreateFavoritoDto) {
    return this.favoritoService.create(createFavoritoDto);
  }

  @Get()
  async findAll(): Promise<Favorito[]> {
    return this.favoritoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Favorito[]> {
    return this.favoritoService.findOne(id);
  }

  @Delete()
  async remove(
    @Query('articulo_id') articulo_id: number,
    @Query('user_id') user_id: number,
  ): Promise<{ message: string }> {
    return this.favoritoService.remove(articulo_id, user_id);
  }
}

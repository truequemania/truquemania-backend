import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Articulo } from './entities/articulo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
  ) { }

  async createArticulo(article: CreateArticuloDto): Promise<{ message: string; articulo: Articulo }> {
    const newArticle = this.articuloRepository.create(article);
    const savedCampana = await this.articuloRepository.save(newArticle);
    return {
      message: 'Artículo creada con éxito',
      articulo: savedCampana,
    };
  }

  async findAll(): Promise<Articulo[]> {
    return this.articuloRepository.find();
  }

  async updateArticulo(id: any, updateArticulo: UpdateArticuloDto): Promise<{ message: string; articulo: Articulo }> {
    const articulo = await this.articuloRepository.findOne({ where: { id } });
    if (!articulo) {
      throw new NotFoundException(`Artículo con id ${id} no encontrada`);
    }

    const updatedArticulo = Object.assign(articulo, updateArticulo);
    await this.articuloRepository.save(updatedArticulo);
    return {
      message: 'Artículo actualizada con éxito',
      articulo: updatedArticulo,
    };
  }

  async deleteArticulo(id: any): Promise<{ message: string }> {
    const articulo = await this.articuloRepository.findOne({ where: { id } });
    if (!articulo) {
      throw new NotFoundException(`Artículo con id ${id} no encontrada`);
    }
    await this.articuloRepository.remove(articulo);
    return { message: 'Artículo eliminada con éxito' };
  }

}

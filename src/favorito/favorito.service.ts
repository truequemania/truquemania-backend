import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorito } from './entities/favorito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritoService {
  constructor(
    @InjectRepository(Favorito)
    private readonly favoritoRepository: Repository<Favorito>,
  ) {}

  async findAll() {
    return this.favoritoRepository.find({ relations: ['user', 'articulo'] });
  }

  async findOne(user_id: number): Promise<Favorito[]> {
    const favoritos = await this.favoritoRepository.find({
      where: { user: { id: user_id } },
      relations: ['user', 'articulo'],
    });

    if (!favoritos.length) {
      throw new NotFoundException(
        `No se encontraron favoritos para el usuario con ID ${user_id}`,
      );
    }

    return favoritos;
  }

  async create(
    createFavoritoDto: CreateFavoritoDto,
  ): Promise<{ message: string; articulo_id: number }> {
    const { articulo_id, user_id } = createFavoritoDto;

    const nuevoFavorito = this.favoritoRepository.create({
      user: { id: user_id },
      articulo: { id: articulo_id },
    });

    await this.favoritoRepository.save(nuevoFavorito);

    return {
      message: 'El artículo se ha agregado a favoritos con éxito.',
      articulo_id,
    };
  }

  async remove(
    articulo_id: number,
    user_id: number,
  ): Promise<{ message: string }> {
    const result = await this.favoritoRepository.delete({
      articulo: { id: articulo_id },
      user: { id: user_id },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`El favorito no fue encontrado`);
    }

    return {
      message: 'El artículo se ha eliminado de favoritos con éxito.',
    };
  }
}

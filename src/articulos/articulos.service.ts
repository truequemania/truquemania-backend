import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinay/cloudinay.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { Articulo } from './entities/articulo.entity';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
    private cloudinaryService: CloudinaryService,
  ) { }

  async createArticulo(article: CreateArticuloDto) {
    const articleFound = await this.articuloRepository.findOne({
      where: {
        nombre: article.nombre,
      },
    });

    if (articleFound) {
      throw new HttpException('El artículo ya existe.', HttpStatus.CONFLICT);
    }

    const uploadResult = await this.cloudinaryService.uploadFile(article.imagen);

    if (!uploadResult) {
      throw new HttpException('Error al subir la imagen.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const imageUrl = uploadResult.secure_url;

    const newArticle = this.articuloRepository.create({
      ...article,
      imagen: imageUrl,
    });

    const savedArticle = await this.articuloRepository.save(newArticle);

    return {
      message: 'Artículo creado con éxito',
      articulo: savedArticle,
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

  async updateImagen(id: any, imagen: Express.Multer.File): Promise<{ message: string; articulo: Articulo }> {

    const articulo = await this.articuloRepository.findOne({ where: { id } });
    if (!articulo) {
      throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    }

    const currentImageUrl = articulo.imagen;
    if (currentImageUrl) {
      const publicId = this.extractPublicId(currentImageUrl);
      if (publicId) {
        await this.cloudinaryService.deleteFile(publicId);
      }
    }

    const uploadResult = await this.cloudinaryService.uploadFile(imagen);

    articulo.imagen = uploadResult.secure_url;

    const updatedArticulo = await this.articuloRepository.save(articulo);

    return {
      message: 'Imagen actualizada con éxito',
      articulo: updatedArticulo,
    };
  }

  async deleteArticulo(id: any): Promise<{ message: string }> {
    const articulo = await this.articuloRepository.findOne({ where: { id } });

    if (!articulo) {
      throw new NotFoundException(`Artículo con id ${id} no encontrado`);
    }

    const imageUrl = articulo.imagen;
    const publicId = this.extractPublicId(imageUrl);

    if (publicId) {
      await this.cloudinaryService.deleteFile(publicId);
    }

    await this.articuloRepository.remove(articulo);

    return { message: 'Artículo eliminado con éxito' };
  }

  private extractPublicId(imageUrl: string): string | null {
    const regex = /\/([^\/]+)\.\w+$/;
    const match = imageUrl.match(regex);
    return match ? match[1] : null;
  }

  async findArticulosById(id: number) {
    return await this.articuloRepository.findOne({ where: { id } });
  }

  async updateFavorito(id: number, favorito: boolean, email: string) {
    const art = await this.findArticulosById(id);
    if (!art) {
      throw new NotFoundException(`Propuesta con ID ${id} no encontrada`);
    }

    if (art.email !== email) {
      throw new NotFoundException(`El email proporcionado no coincide con el email del propietario de la propuesta`);
    }

    art.favorito = favorito;

    await this.articuloRepository.save(art);

    return {
      message: `La propuesta con ID ${id} ha sido actualizada exitosamente`,
    };
  }

}

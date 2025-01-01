import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinay/cloudinay.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { Articulo } from './entities/articulo.entity';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulo)
    private readonly articuloRepository: Repository<Articulo>,
    private cloudinaryService: CloudinaryService,
    private userService: UsersService,
  ) {}

  async findAll() {
    return this.articuloRepository.find({ relations: ['categoria', 'user'] });
  }

  async findOne(user_id: number) {
    const articulo = await this.articuloRepository.find({
      where: { user: { id: user_id } },
      relations: ['categoria', 'user'], 
    });

    if (!articulo) {
      throw new NotFoundException(`Artículo no encontrado`);
    }

    return articulo;
  }

  async createArticulo(article: CreateArticuloDto) {
    const articleFound = await this.articuloRepository.findOne({
      where: { nombre: article.nombre },
    });

    if (articleFound) {
      throw new HttpException('El artículo ya existe.', HttpStatus.CONFLICT);
    }

    const uploadResult = await this.cloudinaryService.uploadFile(
      article.imagen,
    );

    if (!uploadResult) {
      throw new HttpException(
        'Error al subir la imagen.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const imageUrl = uploadResult.secure_url;

    const user = await this.userService.findById(article.user_id);
    if (!user) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const newArticle = this.articuloRepository.create({
      ...article,
      imagen: imageUrl,
      user,
    });

    const savedArticle = await this.articuloRepository.save(newArticle);

    return {
      message: 'Artículo creado con éxito',
      articulo: savedArticle,
    };
  }

  async updateArticulo(
    id: any,
    updateArticulo: UpdateArticuloDto,
  ): Promise<{ message: string; articulo: Articulo }> {
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

  async updateImagen(
    id: any,
    imagen: Express.Multer.File,
  ): Promise<{ message: string; articulo: Articulo }> {
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
}

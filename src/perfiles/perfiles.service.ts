import { Injectable } from '@nestjs/common';
import { ArticulosService } from 'src/articulos/articulos.service';

@Injectable()
export class PerfilesService {
  constructor(private readonly articulosService: ArticulosService) {}

  async findArticulosByUsername(username: string) {
    return await this.articulosService.findArticulosByUsername(username);
  }
}

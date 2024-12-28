import { Controller, Get, Query } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("perfiles")
@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) { }

  @Get()
  async getProfileByUsername(@Query('username') username: string) {
    if (!username) {
      throw new Error('El parámetro username es obligatorio');
    }

    return this.perfilesService.findArticulosByUsername(username);
  }
}

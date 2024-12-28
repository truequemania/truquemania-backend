import { Module } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';
import { ArticulosModule } from 'src/articulos/articulos.module';

@Module({
  imports: [ArticulosModule],
  controllers: [PerfilesController],
  providers: [PerfilesService],
})
export class PerfilesModule { }

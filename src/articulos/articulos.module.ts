import { Module } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { ArticulosController } from './articulos.controller';
import { Articulo } from './entities/articulo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo])],
  controllers: [ArticulosController],
  providers: [ArticulosService],
})
export class ArticulosModule {}

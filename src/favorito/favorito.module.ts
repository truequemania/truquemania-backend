import { Module } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { FavoritoController } from './favorito.controller';
import { UsersModule } from 'src/users/users.module';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { Favorito } from './entities/favorito.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito]), UsersModule, ArticulosModule],
  controllers: [FavoritoController],
  providers: [FavoritoService],
  exports: [FavoritoService],
})
export class FavoritoModule {}

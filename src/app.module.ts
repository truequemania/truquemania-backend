import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticulosModule } from './articulos/articulos.module';
import { CloudinaryModule } from './cloudinay/cloudinay.module';
import { PerfilesModule } from './perfiles/perfiles.module';
import { CategoryModule } from './category/category.module';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 21747,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectTimeout: 60000,
      entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
      synchronize: false,
      ssl: { rejectUnauthorized: false },
    }),
    UsersModule,
    ArticulosModule,
    CloudinaryModule,
    PerfilesModule,
    CategoryModule
  ],
})
export class AppModule { }

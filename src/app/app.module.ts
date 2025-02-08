import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, // Carrega as entidades automaticamente
      // NÃO DEVE SER UTILIZADO EM PRODUÇÃO
      synchronize: true, // Sincroniza o banco de dados com as entidades
    }),
    RecadosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

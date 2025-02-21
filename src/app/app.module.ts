import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
// import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
// import { OutroMiddleware } from 'src/common/middlewares/outro.middleware';
// import { APP_FILTER, APP_GUARD } from '@nestjs/core';
// import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
// import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

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
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // posso usar assim de forma global sem perder a
    // injeção de depencia do nest
    // {
    //   provide: APP_FILTER,
    //   useClass: MyExceptionFilter,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: IsAdminGuard,
    // },
  ],
})
export class AppModule {}

// aplicando o middleware globalmente
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     // a ordem importa
//     consumer.apply(SimpleMiddleware, OutroMiddleware).forRoutes({
//       path: '*',
//       method: RequestMethod.ALL,
//     });
//   }
// }

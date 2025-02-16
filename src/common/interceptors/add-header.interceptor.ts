import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

// para executar coisas antes do metodo ser chamado
@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext, // todo o contexto da requisição(Headers, Body, req, res, etc)
    next: CallHandler<any>, // proximo handler a ser chamado
  ): Observable<any> | Promise<Observable<any>> {
    const response: Response = context.switchToHttp().getResponse();

    response.setHeader('X-Custom-Header', 'Hello World!');
    return next.handle();
  }
}

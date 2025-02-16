/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log(`Antes do metodo ser chamado...`);

    return next.handle().pipe(
      // interceptor de erro
      catchError(error => {
        console.log('deu erro');
        return throwError(() => {
          if (error.name == 'NotFoundException') {
            return new BadRequestException(error.message);
          }
          return new BadRequestException('Erro desconhecido');
        });
      }),
    );
  }
}

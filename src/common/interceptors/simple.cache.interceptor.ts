import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { of, tap } from 'rxjs';

// só exemplo não é recomendado para produção
@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    // antes do metodo ser chamado procuro no cache
    const request: Request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.cache.has(url)) {
      console.log('está no cache');
      return of(this.cache.get(url));
    }

    return next.handle().pipe(
      // depois que o metodo foi chamado e não foi encontrado no cache
      // adiciono no cache
      tap(data => {
        console.log('não está no cache, adicionando...');
        this.cache.set(url, data);
      }),
    );
  }
}

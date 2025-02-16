import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

// transforma a resposta map
@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return {
            data: data,
            meta: {
              total: data.length,
            },
          };
        }
        return data;
      }),
    );
  }
}

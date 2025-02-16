import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

// para executar coisas depois do metodo ser chamado
@Injectable()
export class TimingConectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    console.log(`Antes do metodo ser chamado...`);

    await new Promise(resolve => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(data => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        console.log(
          `Depois do metodo ser chamado, tempo de execução: ${elapsedTime}ms`,
        );
        console.log(data); // data é o retorno do metodo
      }),
    );
  }
}

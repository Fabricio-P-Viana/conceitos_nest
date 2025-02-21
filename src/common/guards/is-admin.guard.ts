import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

// guards pode ser usados tanto em uma unica rota
// ou num controler completo
// ou globalmente
// ex.: @UseGuards(IsAdminGuard)

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('passou no guard'); // esta globalmente
    // qualquer rota ele vai passa e validar

    const request = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const role = request['role']?.role;

    return role === 'admin'; // true pode acessar a rota
    // return false; // false não pode acessar a rota
  }
}

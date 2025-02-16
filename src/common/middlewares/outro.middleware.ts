import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// client(navegador) -> (servidor) -> middleware(req,res) ->
// nest(guards,interceptors,pipes,filters) -> response

// um mddleware pode ser um interceptor, um guard, um pipe, um filter
// ele é mais genérico, é um nivel mais baixo que os outros

export class OutroMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // posso atrelar coisas no body da req
    req['user'] = {
      nome: 'Fabricio',
    };

    next();
  }
}

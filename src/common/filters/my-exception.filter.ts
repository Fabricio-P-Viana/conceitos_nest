import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response, Request } from 'express';

// toda vez que uma exceção do tipo BadRequestException for lançada,
// o método catch será executado
@Catch(BadRequestException) // captura a exceção BadRequestException
export class MyExceptionFilter<T extends BadRequestException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const statusCode = exception.getStatus();
    const request = ctx.getRequest<Request>();
    const error =
      typeof response === 'string'
        ? {
            message: exceptionResponse,
          }
        : (exceptionResponse as object);

    response.status(statusCode).json({
      ...error,
      data: new Date().toString(),
      path: request.path,
    });
  }
}

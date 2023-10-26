import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common/enums';
import { MovementException } from './movement-exceptions';
import {
  ExceptionResponseBody,
  MovementResponseBody,
} from '../../../api/types';

@Catch()
/**
 * Exception Filter to catch all errors
 * or return a body { "message": "I’m a teapot", "reasons": [{ ... }] } when a MovementException occur
 */
export class MovementExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let baseMessage: any = (<Error>exception).message;
    if (typeof (<HttpException>exception)?.getResponse === 'function') {
      baseMessage = (<HttpException>exception).getResponse();
    }

    let responseBody: ExceptionResponseBody | MovementResponseBody = {
      message: baseMessage,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    if (
      httpStatus === HttpStatus.I_AM_A_TEAPOT &&
      exception instanceof MovementException
    ) {
      responseBody = {
        message: exception.message,
        reasons: exception.getReasons(),
      };
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

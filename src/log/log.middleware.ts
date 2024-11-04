import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
  use(req: any, res: any, next: () => void) {
    this.logger.log({
      level: 'info',
      message: `Received request from url: ${req.url} dengan IP: ${req.ip}`,
    });
    next();
  }
}

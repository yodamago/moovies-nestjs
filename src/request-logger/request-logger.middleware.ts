import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `[${new Date().toLocaleString()}] ${req.method} ${
        req.originalUrl
      } payload: ${JSON.stringify(req.body)}, query: ${JSON.stringify(
        req.query,
      )}`,
    );
    next();
  }
}

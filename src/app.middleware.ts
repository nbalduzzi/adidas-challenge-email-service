import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use({ headers }: Request, _: Response, next: NextFunction) {
    if (
      !headers ||
      !headers['authorization'] ||
      headers['authorization'].length === 0
    ) {
      next(new ForbiddenException('authorization required'));
    }

    const token: string = headers['authorization'].split(' ')[1];

    try {
      const decoded: any = verify(token, process.env.SECRET, {
        algorithms: ['HS256'],
      });

      if (
        !decoded ||
        !decoded.origin ||
        !decoded.resource ||
        !decoded.timestamp
      ) {
        next(new UnauthorizedException('unauthorized'));
      }

      if (Date.now() > decoded.timestamp + +process.env.MAX_REQUEST_MS_GAP) {
        // 120000
        next(new UnauthorizedException('unauthorized'));
      }

      next();
    } catch (e) {
      console.error(e);
      next(new UnauthorizedException('invalid token'));
    }
  }
}

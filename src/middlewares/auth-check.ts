import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import jwt_decode from 'jwt-decode';

export type TokenDecoded = {
  user: string;
};

@Injectable()
export class AuthCheck implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async getToken(authorization: string) {
    const tokenDecoded: TokenDecoded = jwt_decode(authorization);
    const userId = tokenDecoded.user;

    if (!userId) {
      return {
        userId: null,
      };
    }

    return {
      userId: userId,
    };
  }

  async getUser(token: string) {
    const { userId } = await this.getToken(token);

    if (!userId) {
      return null;
    }

    const user = await this.userService.findOne({ id: userId });

    return user;
  }

  async use(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) throw new UnauthorizedException();

    const user = await this.getUser(authorization);

    if (!user) throw new UnauthorizedException();

    request.user = user;

    next();
  }
}

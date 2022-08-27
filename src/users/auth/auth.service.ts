import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

interface IGenerateTokenUser {
  _id: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async cryptedPassword(password: string) {
    return await hash(password, 8);
  }

  async verifyPassword(password: string, userPassword: string) {
    return await compare(password.toString(), userPassword.toString());
  }

  async generateToken(user: IGenerateTokenUser) {
    return `JWT ${this.jwtService.sign(
      { user: String(user._id) },
      { secret: process.env.JWT_SECRET, expiresIn: '30d'},
    )}`;
  }
}

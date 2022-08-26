import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  async cryptedPassword(password: string) {
    return await hash(password, 8);
  }
}

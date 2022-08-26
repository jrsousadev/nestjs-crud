import { Injectable, Post } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  async cryptedPassword(password: string) {
    return await hash(password, 8);
  }

  async verifyPassword(password: string, user: User) {
    return await compare(password.toString(), user.password.toString());
  }
}

import { Controller, Get, Post, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  helloWorld() {
    return 'Hello world';
  }
}

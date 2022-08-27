import { Controller, Res, Post, Body, NotFoundException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users.service';
import { AuthService } from './auth.service';

interface ILoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async execute(@Res() res, @Body() data: ILoginDto) {
    const user = await this.usersService.findOne({email: data.email});

    if (!user) throw new NotFoundException("Email or password incorret");

    const correctPassword = await this.authService.verifyPassword(data.password, user.password);

    if (!correctPassword) throw new NotFoundException("Email or password incorret");
    
    return res.status(HttpStatus.OK).json({
      token: await this.authService.generateToken(user),
      user,
    })
  }
}
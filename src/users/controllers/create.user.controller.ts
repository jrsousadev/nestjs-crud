import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';

@Controller('users')
export class CreateUserController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  async execute(@Res() res, @Body() data: CreateUserDto) {
    const userExist = await this.usersService.findOne({ email: data.email });

    if (userExist) throw new NotFoundException('User is exist');

    data.password = await this.authService.cryptedPassword(data.password);
  
    const user = await this.usersService.create(data);

    return res.status(HttpStatus.CREATED).json(user);
  }
}

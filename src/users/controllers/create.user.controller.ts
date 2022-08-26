import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';

@Controller('users')
export class CreateUserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async execute(@Res() res, @Body() data: CreateUserDto) {
    const userExist = await this.usersService.findOne({ email: data.email });

    if (userExist) throw new NotFoundException('User is exist');

    const user = await this.usersService.create(data);

    return res.status(HttpStatus.CREATED).json(user);
  }
}

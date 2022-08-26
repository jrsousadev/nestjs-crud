import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Controller('users')
export class FindUserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async execute(@Res() res) {
    const users = await this.usersService.findAll();

    return res.status(HttpStatus.OK).json(users);
  }
}

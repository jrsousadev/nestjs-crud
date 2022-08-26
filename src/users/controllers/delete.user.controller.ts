import {
  Controller,
  Delete,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':id')
  async execute(@Res() res, @Param('id') id: string) {
    const userExist = await this.usersService.findOne({ id });

    if (!userExist) throw new NotFoundException('User is not exist');

    const userDeleted = await this.usersService.remove(id);

    return res.status(HttpStatus.OK).json(userDeleted);
  }
}

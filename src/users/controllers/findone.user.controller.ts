import { Controller, Get, HttpStatus, NotFoundException, Param, Res } from '@nestjs/common';
import { UsersService } from '../users.service';

@Controller('users')
export class FindOneUserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async execute(@Res() res, @Param('id') id: string) {
      const user = await this.usersService.findOne({ id });

      if (!user) throw new NotFoundException('User is not exist');

      return res.status(HttpStatus.OK).json(user);
  }
}

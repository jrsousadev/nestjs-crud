import { Body, Controller, HttpStatus, NotFoundException, Param, Patch, Res } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../users.service';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  async execute(@Res() res, @Param('id') id: string, @Body() data: UpdateUserDto) {
      const user = await this.usersService.findOne({ id });

      if (!user) throw new NotFoundException('User is not exist');

      const userUpdated = await this.usersService.update(id, data)

      return res.status(HttpStatus.CREATED).json(userUpdated);
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { CreateUserController } from './controllers/create.user.controller';
import { FindOneUserController } from './controllers/findone.user.controller';
import { FindUserController } from './controllers/find.user.controller';
import { UpdateUserController } from './controllers/update.user.controller';
import { DeleteUserController } from './controllers/delete.user.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    CreateUserController,
    FindOneUserController,
    FindUserController,
    UpdateUserController,
    DeleteUserController,
    AuthController,
  ],
  providers: [UsersService, AuthService, JwtService],
})
export class UsersModule {}

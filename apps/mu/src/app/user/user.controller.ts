import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt.guard';
import { User } from '../auth/decorators/session.decorator';
import { JwtPayload } from '../auth/dto/jwt-payload';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getMyProfile(@User() user: JwtPayload): Promise<UserDto> {
    return await this.userService.getUserById(user.userId);
  }

  @Patch()
  updateMyProfile(@Body() updateUserDto: UpdateUserDto, @User() user: JwtPayload) {
    return this.userService.updateMyProfile(user.userId, updateUserDto);
  }
}
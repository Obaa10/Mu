import { Controller, Post, Body, Res, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { UtilService } from '../util/util.service';
import { Response } from 'express';
import { JwtPayloadWithToken } from './dto/jwt-payload';
import { RefreshTokenGuard } from './strategy/refresh-token.guard';
import { User } from './decorators/session.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilService: UtilService,
  ) { }

  @Post()
  async verifyEmail(@Body() body: { email: string }): Promise<VerifyEmailDto> {
    return await this.authService.verifyEmail(body.email);
  }

  @Post()
  async verifyCode(@Res() res: Response, @Body() body: { email: string; code: string }): Promise<VerifyCodeDto> {
    const verify = await this.authService.verifyCode(body.email, body.code);
    this.utilService.setTokensAsCookies(res, { accessToken: verify.accessToken, refreshToken: verify.refreshToken });
    return verify;
  }


  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Res() res: Response, @User() user: JwtPayloadWithToken) {
    const { accessToken, refreshToken } = await this.authService.refresh(user);
    this.utilService.setTokensAsCookies(res, { accessToken, refreshToken });
  }


}

import { Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [ConfigService, JwtService, UtilService],
    exports: [UtilService],
})
export class UtilsModule { }

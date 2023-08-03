import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>("JWT_SECRET"),
            signOptions: { expiresIn: "1h"}
        }),
        inject: [ConfigService]
    })],
    controllers: [AuthController],
    providers: [AuthService, DatabaseService, ConfigService, JwtStrategy],
})
export class AuthModule {}

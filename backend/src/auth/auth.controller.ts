import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { DeleteAuthDto } from './dto/delete-auto.dto';
import { FindOneAuthDto } from './dto/findOne-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    registerUser(@Body() userObject: RegisterAuthDto) {
        return this.authService.register(userObject);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    loginUser(@Body() userObject: LoginAuthDto) {
        return this.authService.login(userObject);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteUser(@Body() userObject: DeleteAuthDto) {
        return this.authService.delete(userObject);
    }

    @Post('findOne')
    findUser(@Body() userObject: FindOneAuthDto) {
        return this.authService.findUser(userObject);
    }

    @Patch('reset')
    resetPassword(@Body() userObject: ResetAuthDto) {
        return this.authService.resetPassword(userObject);
    }
}

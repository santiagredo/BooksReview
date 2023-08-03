import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { DeleteAuthDto } from './dto/delete-auto.dto';
import { FindOneAuthDto } from './dto/findOne-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(userObject: RegisterAuthDto): Promise<{
        user: import("./entities/auth.entity").AuthDocument;
        token: string;
    }>;
    loginUser(userObject: LoginAuthDto): Promise<{
        user: import("./entities/auth.entity").AuthDocument;
        token: string;
    }>;
    deleteUser(userObject: DeleteAuthDto): Promise<boolean>;
    findUser(userObject: FindOneAuthDto): Promise<boolean>;
    resetPassword(userObject: ResetAuthDto): Promise<boolean>;
}

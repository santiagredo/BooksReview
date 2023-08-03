import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import { AuthDocument } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DeleteAuthDto } from './dto/delete-auto.dto';
import { FindOneAuthDto } from './dto/findOne-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
export declare class AuthService {
    private readonly databaseService;
    private jwtAuthService;
    private configService;
    constructor(databaseService: DatabaseService, jwtAuthService: JwtService, configService: ConfigService);
    private DATABASE_USERS_COLLECTION_NAME;
    register(userObject: RegisterAuthDto): Promise<{
        user: AuthDocument;
        token: string;
    }>;
    login(userObject: LoginAuthDto): Promise<{
        user: AuthDocument;
        token: string;
    }>;
    delete(userObject: DeleteAuthDto): Promise<boolean>;
    findUser(userObject: FindOneAuthDto): Promise<boolean>;
    resetPassword(userObject: ResetAuthDto): Promise<boolean>;
}

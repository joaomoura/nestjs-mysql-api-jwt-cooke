import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcryptjs';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import RegisterDto from "./dto/register.dto";
import TokenPayload from "./tokenPayload.interface";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    public async register(registrationData: RegisterDto) {
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            throw new HttpException('Opah! Algo deu errado. Tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getAuthenticatedUser(email: string, hashedPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            const isPasswordMatching = await bcrypt.compare(
                hashedPassword,
                user.password
            );
            if (!isPasswordMatching) {
                throw new HttpException('Credenciais incorretas', HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Credenciais incorretas', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Credenciais incorretas', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
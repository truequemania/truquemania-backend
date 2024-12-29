import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/loginDto';
import { EmailDto } from './dto/emailDto';
import { AuthGuard } from './guard/auth.guard';
import { PasswordDto } from './dto/passwordDto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,) { }

    @Post("register")
    register(@Body() registerDto: RegisterDto) {
        return this.userService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }

    @Post("email")
    email(@Body() email: EmailDto) {
        return this.userService.email(email);
    }

    @Patch('password')
    @UseGuards(AuthGuard)
    password(@Request() req, @Body() passDto: PasswordDto) {
        return this.userService.password(req.user.email, passDto);
    }

    @Patch('tokens')
    @UseGuards(AuthGuard)
    token(@Request() req, @Body() isVerified: boolean) {
        return this.userService.token(req.user.email, isVerified);
    }

}

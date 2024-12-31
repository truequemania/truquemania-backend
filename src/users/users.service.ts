import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerDto';
import { userinter } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';
import * as fs from 'fs';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginDto } from './dto/loginDto';
import { EmailDto } from './dto/emailDto';
import { PasswordDto } from './dto/passwordDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userinter)
    private readonly usersRepository: Repository<userinter>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register({ password, email, name, isVerified, role }: RegisterDto) {
    const user = await this.usersRepository.findOneBy({ email });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (user) {
      throw new BadRequestException('Correo electrónico ya existe.');
    }

    if (!emailRegex.test(email)) {
      throw new BadRequestException('Ingrese un correo válido.');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isVerified,
      role,
    });

    await this.usersRepository.save(newUser);

    const Usuario = { email, name, password };
    let correo = 'register';

    await this.envioEmail(Usuario, email, correo);

    return {
      message: 'Usuario registrado correctamente.',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Correo inválido');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña inválido');
    }

    if (user.isVerified == false) {
      throw new UnauthorizedException('Su cuenta no está verificada');
    }

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async email({ email }: EmailDto) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('Correo electrónico no existe.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (!emailRegex.test(email)) {
      throw new BadRequestException('Ingrese un correo válido.');
    }

    let correo = 'verificacion';

    await this.envioEmail(user, email, correo);

    return { message: 'Correo electrónico enviado.' };
  }

  async password(email: string, passDto: PasswordDto) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (passDto.password !== passDto.verPassword) {
      throw new UnauthorizedException('Las contraseñas no coinciden');
    }

    const hashedNewPassword = await bcryptjs.hash(passDto.password, 10);

    await this.usersRepository.update(
      { email },
      { password: hashedNewPassword },
    );

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      tokens: token,
      name: user.name,
      email: user.email,
      message: 'Contraseña actualizada correctamente',
    };
  }

  async token(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    await this.usersRepository.update({ email }, { isVerified: true });

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      name: user.name,
      email: user.email,
    };
  }

  async envioEmail(user: any, email: string, correo: string) {
    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    let url: string;
    let filePath: string;

    if (correo == 'register') {
      url = `https://truequemania.netlify.app/login?token=${token}`;
      filePath = path.resolve(
        process.cwd(),
        'src/users/html/plantillaReg.html',
      );
    }

    if (correo == 'verificacion') {
      url = `https://truequemania.netlify.app/password?token=${token}`;
      filePath = path.resolve(process.cwd(), 'src/users/html/plantilla.html');
    }

    const htmlTemplate = fs.readFileSync(filePath, 'utf8');
    const personalizedHtml = htmlTemplate
      .replace('{{name}}', user.name)
      .replace('{{token}}', url);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Correo de verificación',
      html: personalizedHtml,
    });
  }
}

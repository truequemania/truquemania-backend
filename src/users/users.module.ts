import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userinter } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "./mailer.config";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwt.constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([userinter]),
    MailerModule.forRoot(mailerConfig),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }


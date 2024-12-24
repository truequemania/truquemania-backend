import { MailerOptions } from "@nestjs-modules/mailer";

export const mailerConfig: MailerOptions = {
    transport:{
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user: "truequemania.cl@gmail.com",
            pass:"pfzymobwyggftulg"
        },
        tls:{
            rejectUnauthorized: false
        }
    },
}
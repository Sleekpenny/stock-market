import nodemailer, { Mail } from "nodemailer";
import { NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./nodemailer_template";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail = async ({ email, name, intro}: WelcomeEmailData) =>{
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);

    const mailOptions= {
        from: `"Stock-market" <macphantomsoft@gmail.com>`,
        to:email,
        subject: `Welcome to Stock Market - your stock market toolkit is ready`,
        text: 'Thanks for joining Stock Market',
        html: htmlTemplate
    };

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async({date, email, newsContent}: {email:string, date:string, newsContent:string}):Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace('{{ date }}', date).replace('{{newsContent}}', newsContent)

    const sendMailOptions ={
        from: `'stock-market' <macphantomsoft@gmail.com>`,
        to: email,
        subject: `Market News summary Today - ${date}`,
        text:`Today's market news summary from Stock market`,
        html: htmlTemplate
    }

    await transporter.sendMail(sendMailOptions);
}